import React, { useEffect, useMemo, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "./ArticleRenderer.module.scss";

export interface ArticleReference {
    /** The identifier used by \cite{key}. */
    key: string;

    /** The rendered bibliography entry. */
    text: React.ReactNode;

    /**
     * Text used for alphabetical ordering, normally the first author's
     * surname. If omitted, the renderer falls back to the visible text and
     * then to the reference key.
     */
    sortKey?: string;
}

/**
 * A slot is a React node or a function that creates a React node.
 */
export type ArticleSlot = React.ReactNode | (() => React.ReactNode);

export interface ArticleData {
    title: string;
    topics: readonly string[];
    references: readonly ArticleReference[];
    content: string;
    headerNote?: React.ReactNode;
    slots?: Readonly<Record<string, ArticleSlot>>;
}

type BodyBlock =
    | {
          type: "paragraph";
          value: string;
      }
    | {
          type: "math";
          value: string;
      };

function isEscaped(source: string, index: number): boolean {
    let slashCount = 0;

    for (let i = index - 1; i >= 0 && source[i] === "\\"; i -= 1) {
        slashCount += 1;
    }

    return slashCount % 2 === 1;
}

function findClosingDelimiter(source: string, start: number, delimiter: string): number {
    for (let i = start; i <= source.length - delimiter.length; i += 1) {
        if (source.startsWith(delimiter, i) && !isEscaped(source, i)) {
            return i;
        }
    }

    return -1;
}

/**
 * Finds the closing brace paired with the opening brace at openingIndex.
 *
 * Unlike a simple indexOf("}"), this supports nested commands such as:
 *
 * \bf{bold and \it{italic}}
 */
function findMatchingBrace(source: string, openingIndex: number): number {
    if (source[openingIndex] !== "{") {
        return -1;
    }

    let depth = 0;

    for (let i = openingIndex; i < source.length; i += 1) {
        if (isEscaped(source, i)) {
            continue;
        }

        if (source[i] === "{") {
            depth += 1;
            continue;
        }

        if (source[i] === "}") {
            depth -= 1;

            if (depth === 0) {
                return i;
            }
        }
    }

    return -1;
}

function dedent(source: string): string {
    const lines = source.replace(/\r\n?/g, "\n").split("\n");

    while (lines.length > 0 && lines[0].trim() === "") {
        lines.shift();
    }

    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
        lines.pop();
    }

    const indentation = lines.filter((line) => line.trim() !== "").map((line) => line.match(/^\s*/)?.[0].length ?? 0);

    const commonIndent = indentation.length > 0 ? Math.min(...indentation) : 0;

    return lines.map((line) => line.slice(commonIndent).trimEnd()).join("\n");
}

function appendParagraphBlocks(blocks: BodyBlock[], source: string): void {
    const cleaned = source.replace(/^\s*\n/, "").replace(/\n\s*$/, "");

    if (cleaned.trim() === "") {
        return;
    }

    const paragraphs = cleaned.split(/\n[\t ]*\n+/);

    paragraphs.forEach((paragraph) => {
        const value = paragraph.trim();

        if (value !== "") {
            blocks.push({
                type: "paragraph",
                value
            });
        }
    });
}

function parseBodyBlocks(content: string): BodyBlock[] {
    const source = dedent(content);
    const blocks: BodyBlock[] = [];

    let textBuffer = "";
    let index = 0;

    const flushText = () => {
        appendParagraphBlocks(blocks, textBuffer);
        textBuffer = "";
    };

    while (index < source.length) {
        if (source.startsWith("$$", index) && !isEscaped(source, index)) {
            const closingIndex = findClosingDelimiter(source, index + 2, "$$");

            if (closingIndex !== -1) {
                flushText();

                blocks.push({
                    type: "math",
                    value: source.slice(index + 2, closingIndex).trim()
                });

                index = closingIndex + 2;
                continue;
            }
        }

        textBuffer += source[index];
        index += 1;
    }

    flushText();
    return blocks;
}

function reactNodeToText(node: React.ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(reactNodeToText).join("");
    }

    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
        return reactNodeToText(node.props.children);
    }

    return "";
}

function referenceAnchor(key: string): string {
    return `reference-${key.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

interface NumberedReference extends ArticleReference {
    number: number;
}

function renderCitation(
    rawKeys: string,
    referenceNumbers: ReadonlyMap<string, number>,
    nodeKey: string
): React.ReactNode {
    const keys = Array.from(
        new Set(
            rawKeys
                .split(",")
                .map((key) => key.trim())
                .filter(Boolean)
        )
    );

    const resolved = keys
        .map((key) => ({
            key,
            number: referenceNumbers.get(key)
        }))
        .sort((left, right) => (left.number ?? Number.POSITIVE_INFINITY) - (right.number ?? Number.POSITIVE_INFINITY));

    return (
        <span key={nodeKey} className={styles.citation}>
            [
            {resolved.map(({ key, number }, index) => (
                <React.Fragment key={key}>
                    {index > 0 ? ", " : null}

                    {number === undefined ? (
                        <span className={styles.missingCitation} title={`Unknown reference key: ${key}`}>
                            ?{key}
                        </span>
                    ) : (
                        <a>{number}</a>
                    )}
                </React.Fragment>
            ))}
            ]
        </span>
    );
}

function renderSlot(rawKey: string, slots: Readonly<Record<string, ArticleSlot>>, nodeKey: string): React.ReactNode {
    const slotKey = rawKey.trim();
    const slot = slots[slotKey];

    if (slot === undefined) {
        return (
            <span key={nodeKey} className={styles.missingSlot} title={`Unknown article slot: ${slotKey}`}>
                [missing slot: {slotKey}]
            </span>
        );
    }

    const rendered = typeof slot === "function" ? slot() : slot;

    return <React.Fragment key={nodeKey}>{rendered}</React.Fragment>;
}

function renderInlineContent(
    source: string,
    referenceNumbers: ReadonlyMap<string, number>,
    slots: Readonly<Record<string, ArticleSlot>>,
    keyPrefix: string
): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];

    let textBuffer = "";
    let index = 0;
    let nodeIndex = 0;

    const nextKey = (kind: string) => `${keyPrefix}-${kind}-${nodeIndex++}`;

    const flushText = () => {
        if (textBuffer === "") {
            return;
        }

        nodes.push(textBuffer);
        textBuffer = "";
    };

    while (index < source.length) {
        /*
         * Outside math, a doubled backslash escapes a parser command.
         *
         * In a String.raw string:
         *
         *     \\bf{literal}
         *
         * renders literally as:
         *
         *     \bf{literal}
         */
        if (source[index] === "\\" && source[index + 1] === "\\") {
            textBuffer += "\\";
            index += 2;
            continue;
        }

        /*
         * \$ renders a literal dollar sign instead of starting inline math.
         */
        if (source[index] === "\\" && source[index + 1] === "$") {
            textBuffer += "$";
            index += 2;
            continue;
        }

        if (source.startsWith("\\bf{", index) && !isEscaped(source, index)) {
            const openingBrace = index + 3;
            const closingBrace = findMatchingBrace(source, openingBrace);

            if (closingBrace !== -1) {
                flushText();

                const nodeKey = nextKey("bold");
                const innerSource = source.slice(openingBrace + 1, closingBrace);

                nodes.push(
                    <strong key={nodeKey} className={styles.boldText}>
                        {renderInlineContent(innerSource, referenceNumbers, slots, `${nodeKey}-content`)}
                    </strong>
                );

                index = closingBrace + 1;
                continue;
            }
        }

        if (source.startsWith("\\it{", index) && !isEscaped(source, index)) {
            const openingBrace = index + 3;
            const closingBrace = findMatchingBrace(source, openingBrace);

            if (closingBrace !== -1) {
                flushText();

                const nodeKey = nextKey("italic");
                const innerSource = source.slice(openingBrace + 1, closingBrace);

                nodes.push(
                    <em key={nodeKey} className={styles.italicText}>
                        {renderInlineContent(innerSource, referenceNumbers, slots, `${nodeKey}-content`)}
                    </em>
                );

                index = closingBrace + 1;
                continue;
            }
        }

        if (source.startsWith("\\slot{", index) && !isEscaped(source, index)) {
            const openingBrace = index + 5;
            const closingBrace = findMatchingBrace(source, openingBrace);

            if (closingBrace !== -1) {
                flushText();

                nodes.push(renderSlot(source.slice(openingBrace + 1, closingBrace), slots, nextKey("slot")));

                index = closingBrace + 1;
                continue;
            }
        }

        if (source.startsWith("\\cite{", index) && !isEscaped(source, index)) {
            const openingBrace = index + 5;
            const closingBrace = findMatchingBrace(source, openingBrace);

            if (closingBrace !== -1) {
                flushText();

                nodes.push(
                    renderCitation(source.slice(openingBrace + 1, closingBrace), referenceNumbers, nextKey("citation"))
                );

                index = closingBrace + 1;
                continue;
            }
        }

        if (source[index] === "$" && !isEscaped(source, index)) {
            if (source.startsWith("$$", index)) {
                textBuffer += "$$";
                index += 2;
                continue;
            }

            const closingDollar = findClosingDelimiter(source, index + 1, "$");

            if (closingDollar !== -1) {
                flushText();

                nodes.push(
                    <InlineMath key={nextKey("inline-math")} math={source.slice(index + 1, closingDollar).trim()} />
                );

                index = closingDollar + 1;
                continue;
            }
        }

        if (source[index] === "\n") {
            flushText();
            nodes.push(<br key={nextKey("line-break")} />);
            index += 1;
            continue;
        }

        textBuffer += source[index];
        index += 1;
    }

    flushText();
    return nodes;
}

export const ArticleRenderer = ({ title, topics, references, content, headerNote, slots = {} }: ArticleData) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const articleBodyRef = useRef<HTMLDivElement>(null);

    const [footerBounds, setFooterBounds] = useState({
        left: 0,
        width: 0
    });

    const [showFooter, setShowFooter] = useState(false);

    const numberedReferences = useMemo<NumberedReference[]>(() => {
        const keys = new Set<string>();

        references.forEach((reference) => {
            if (keys.has(reference.key)) {
                throw new Error(`Duplicate reference key: ${reference.key}`);
            }

            keys.add(reference.key);
        });

        return [...references]
            .sort((left, right) => {
                const leftText = reactNodeToText(left.text);
                const rightText = reactNodeToText(right.text);
                const leftKey = left.sortKey || leftText || left.key;
                const rightKey = right.sortKey || rightText || right.key;

                return leftKey.localeCompare(rightKey, undefined, {
                    sensitivity: "base",
                    numeric: true
                });
            })
            .map((reference, index) => ({
                ...reference,
                number: index + 1
            }));
    }, [references]);

    const referenceNumbers = useMemo(
        () => new Map(numberedReferences.map((reference) => [reference.key, reference.number])),
        [numberedReferences]
    );

    const bodyBlocks = useMemo(() => parseBodyBlocks(content), [content]);

    useEffect(() => {
        const pageContainer = containerRef.current;
        const scrollableContent = contentRef.current;
        const articleBody = articleBodyRef.current;

        if (!pageContainer || !scrollableContent || !articleBody) {
            return;
        }

        const updateFooter = () => {
            const isMobile = window.matchMedia("(max-width: 992px)").matches;
            const scrollElement = isMobile ? pageContainer : scrollableContent;

            const isScrollable = scrollElement.scrollHeight > scrollElement.clientHeight + 1;

            const isAtTop = scrollElement.scrollTop <= 1;
            const rect = pageContainer.getBoundingClientRect();

            setFooterBounds({
                left: rect.left,
                width: rect.width
            });

            setShowFooter(isScrollable && isAtTop);
        };

        const resizeObserver = new ResizeObserver(updateFooter);

        pageContainer.addEventListener("scroll", updateFooter);
        scrollableContent.addEventListener("scroll", updateFooter);
        window.addEventListener("resize", updateFooter);

        resizeObserver.observe(pageContainer);
        resizeObserver.observe(scrollableContent);
        resizeObserver.observe(articleBody);

        if (pageContainer.parentElement) {
            resizeObserver.observe(pageContainer.parentElement);
        }

        let secondFrame = 0;

        const firstFrame = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(updateFooter);
        });

        void document.fonts?.ready.then(updateFooter);

        return () => {
            cancelAnimationFrame(firstFrame);
            cancelAnimationFrame(secondFrame);

            pageContainer.removeEventListener("scroll", updateFooter);
            scrollableContent.removeEventListener("scroll", updateFooter);
            window.removeEventListener("resize", updateFooter);

            resizeObserver.disconnect();
        };
    }, [bodyBlocks]);

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.fixedHeader}>
                <div className={styles.introduction}>
                    <p className={styles.articleTitle}>{title}</p>

                    <p className={styles.topics}>
                        <span className={styles.topicsLabel}>Topics:</span>

                        {topics.map((topic, index) => (
                            <span key={`${topic}-${index}`} className={styles.topic}>
                                {topic}
                            </span>
                        ))}
                    </p>
                </div>

                {headerNote ? <div className={styles.preprint}>{headerNote}</div> : null}

                <hr className={styles.headerDivider} />
            </div>

            <div ref={contentRef} className={styles.content}>
                <div ref={articleBodyRef} className={styles.articleBody}>
                    {bodyBlocks.map((block, index) =>
                        block.type === "math" ? (
                            <div key={`math-${index}`} className={styles.displayMath}>
                                <BlockMath math={block.value} />
                            </div>
                        ) : (
                            <p key={`paragraph-${index}`} className={styles.articleParagraph}>
                                {renderInlineContent(block.value, referenceNumbers, slots, `paragraph-${index}`)}
                            </p>
                        )
                    )}

                    {numberedReferences.length > 0 ? (
                        <div className={styles.references}>
                            <div className={styles.referencesTitle}>
                                <p>References</p>
                            </div>

                            {numberedReferences.map((reference) => (
                                <div
                                    key={reference.key}
                                    id={referenceAnchor(reference.key)}
                                    className={styles.reference}
                                >
                                    <span className={styles.referenceNumber}>[{reference.number}]</span>{" "}
                                    {reference.text}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

            <div
                className={`${styles.containerFooter} ${showFooter ? styles.footerVisible : ""}`}
                style={{
                    left: footerBounds.left,
                    width: footerBounds.width
                }}
            >
                <p>scroll for more</p>
            </div>
        </div>
    );
};

export function createArticle(data: ArticleData): React.ReactElement {
    return <ArticleRenderer {...data} />;
}

export default ArticleRenderer;
