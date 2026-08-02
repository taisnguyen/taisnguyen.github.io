import React, { useEffect, useRef, useState } from "react";
import { InlineMath } from "react-katex";
import styles from "./Home.module.scss";
import styled from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// lazy load
const NordhausGaddumArticle = React.lazy(() => import("../../articles/nordhaus-gaddum"));
const NordhausGaddumNotesArticle = React.lazy(() => import("../../articles/nordhaus-gaddum-notes"));

const articleComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
    "nordhaus-gaddum": NordhausGaddumArticle,
    "nordhaus-gaddum-notes": NordhausGaddumNotesArticle
};

const Home = () => {
    const navigate = useNavigate();
    const { articleSlug } = useParams<{ articleSlug?: string }>();

    const contentBoundsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const ArticleComponent = articleSlug ? articleComponents[articleSlug] : undefined;
    const isArticleOpen = ArticleComponent !== undefined;
    const [showFooter, setShowFooter] = useState(false);
    const [footerBounds, setFooterBounds] = useState({
        left: 0,
        width: 0
    });

    useEffect(() => {
        if (isArticleOpen) return;

        const contentBounds = contentBoundsRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!contentBounds || !scrollContainer) return;

        let isActive = true;
        let firstAnimationFrame = 0;
        let secondAnimationFrame = 0;

        const updateFooter = () => {
            const rect = contentBounds.getBoundingClientRect();
            const nextBounds = {
                left: rect.left,
                width: rect.width
            };

            setFooterBounds((currentBounds) => {
                if (currentBounds.left === nextBounds.left && currentBounds.width === nextBounds.width) {
                    return currentBounds;
                }

                return nextBounds;
            });

            const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight + 1;
            const shouldShowFooter = isScrollable && scrollContainer.scrollTop <= 1;

            setShowFooter((currentValue) => (currentValue === shouldShowFooter ? currentValue : shouldShowFooter));
        };

        const resizeObserver = new ResizeObserver(updateFooter);

        resizeObserver.observe(contentBounds);
        resizeObserver.observe(scrollContainer);

        if (contentBounds.parentElement) {
            resizeObserver.observe(contentBounds.parentElement);
        }

        Array.from(scrollContainer.children).forEach((child) => {
            resizeObserver.observe(child as Element);
        });

        scrollContainer.addEventListener("scroll", updateFooter);
        window.addEventListener("resize", updateFooter);

        firstAnimationFrame = requestAnimationFrame(() => {
            secondAnimationFrame = requestAnimationFrame(updateFooter);
        });

        void document.fonts?.ready.then(() => {
            if (isActive) updateFooter();
        });

        return () => {
            isActive = false;

            cancelAnimationFrame(firstAnimationFrame);
            cancelAnimationFrame(secondAnimationFrame);

            scrollContainer.removeEventListener("scroll", updateFooter);
            window.removeEventListener("resize", updateFooter);
            resizeObserver.disconnect();
        };
    }, [isArticleOpen]);

    if (articleSlug && !ArticleComponent) {
        return <Navigate to="/home" replace />;
    }

    return (
        <>
            <div className={styles.container}>
                {isArticleOpen && ArticleComponent ? (
                    <div className={styles.articleSlot}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "left",
                                width: "100%",
                                fontSize: "1em",
                                marginTop: "auto",
                                // marginBottom: "20px",
                                textDecoration: "underline dotted"
                            }}
                        >
                            <span
                                style={{ cursor: "pointer", color: "#4a4a4a" }}
                                aria-hidden="true"
                                onClick={() => navigate("/home")}
                            >
                                ← go back
                            </span>
                        </div>
                        <hr
                            style={{
                                border: "none",
                                borderTop: "2px solid #eee",
                                margin: "20px 0 0"
                            }}
                        />
                        <React.Suspense fallback={<div style={{ color: "#4a4a4a", marginTop: "1em" }}>Loading...</div>}>
                            <ArticleComponent />
                        </React.Suspense>
                    </div>
                ) : (
                    <div ref={contentBoundsRef} className={styles.introduction}>
                        <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>

                        <p style={{ marginBottom: "2em" }}>dGFpLnNhbmgubmdAZ21haWwuY29t</p>

                        <div ref={scrollContainerRef} className={styles.content}>
                            {/* CONTENT START */}
                            <div style={{ marginBottom: "2em" }}>
                                <p>
                                    im a senior at princeton university studying computer science and mathematics. ive
                                    worked on both practical systems and theoretical problems, and im especially
                                    interested in where the two meet! ill be joining imc as a software engineer to work
                                    on their low-latency trading systems.
                                </p>
                            </div>

                            <div style={{ marginTop: "0" }}>
                                ¶ my recent projects
                                <hr
                                    style={{
                                        border: "none",
                                        borderTop: "2px solid #eee",
                                        margin: "8px 0"
                                    }}
                                />
                                <div style={{ marginBottom: "2em" }}>
                                    <p style={{ marginBottom: "1em" }} />

                                    <Project>
                                        <ProjectHeader>
                                            <p style={{ fontWeight: 500 }}>
                                                nordhaus-gaddum inequalities for dominating-set counts in bipartite
                                                graphs
                                            </p>

                                            <div className="project-topics">
                                                extremal graph theory
                                                <br />
                                                dominating sets
                                                <br />
                                                bipartite graphs
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "right",
                                                        width: "100%",
                                                        fontSize: "1em",
                                                        marginTop: "auto",
                                                        textDecoration: "underline dotted"
                                                    }}
                                                >
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                        aria-hidden="true"
                                                        onClick={() => navigate("/home/nordhaus-gaddum")}
                                                    >
                                                        read more →
                                                    </span>
                                                </div>
                                            </div>
                                        </ProjectHeader>

                                        <p style={{ fontFamily: "Satoshi-Variable" }}>
                                            we show that for a bipartite graph <InlineMath math="G" /> with nonempty
                                            bipartition <InlineMath math="(A,B)" />, the nordhaus-gaddum inequality for
                                            the number of dominating sets holds:{" "}
                                            <InlineMath math="\partial(G) + \partial(\overline{G}) \geq 2(2^{|A|} - 1)(2^{|B|} - 1) + 2," />{" "}
                                            where <InlineMath math="\partial(G)" /> is the number of dominating sets in{" "}
                                            <InlineMath math="G" />.
                                        </p>
                                    </Project>

                                    <hr
                                        style={{
                                            border: "none",
                                            borderTop: "2px solid #eee",
                                            margin: "20px 0"
                                        }}
                                    />

                                    <Project>
                                        <ProjectHeader>
                                            <p style={{ fontWeight: 500 }}>parallel leiden-cpm implementation</p>

                                            <div className="project-topics">
                                                community detection
                                                <br />
                                                parallelization
                                                <br />
                                                scalability
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "right",
                                                        width: "100%",
                                                        fontSize: "1em",
                                                        marginTop: "auto",
                                                        textDecoration: "underline dotted"
                                                    }}
                                                >
                                                    <span aria-hidden="true" style={{ opacity: 0.5 }}>
                                                        work in progress
                                                    </span>
                                                </div>
                                            </div>
                                        </ProjectHeader>

                                        <p style={{ fontFamily: "Satoshi-Variable" }}>
                                            we present a memory-efficient parallel implementation of the leiden-cpm
                                            algorithm for community detection. notably, we identify a requeuing bug in
                                            reference implementations and show that our implementation is faster and
                                            more memory-efficient on very large networks.
                                        </p>
                                    </Project>

                                    <hr
                                        style={{
                                            border: "none",
                                            borderTop: "2px solid #eee",
                                            margin: "20px 0"
                                        }}
                                    />

                                    <Project>
                                        <ProjectHeader>
                                            <p style={{ fontWeight: 500 }}>automatic test suite generator</p>

                                            <div className="project-topics">
                                                property-based testing
                                                <br />
                                                test suite generation
                                                <br />
                                                fuzzing
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "right",
                                                        width: "100%",
                                                        fontSize: "1em",
                                                        marginTop: "auto",
                                                        textDecoration: "underline dotted"
                                                    }}
                                                >
                                                    <span aria-hidden="true" style={{ opacity: 0.5 }}>
                                                        work in progress
                                                    </span>
                                                </div>
                                            </div>
                                        </ProjectHeader>

                                        <p style={{ fontFamily: "Satoshi-Variable" }}>
                                            we develop a tool to automatically generate test suites that supports fuzz,
                                            example, and property-based testing.
                                        </p>
                                    </Project>
                                </div>
                            </div>
                            {/* CONTENT END */}
                            {/*  */}
                            <div style={{ marginTop: "0" }}>
                                ✎ my recent notes
                                <hr
                                    style={{
                                        border: "none",
                                        borderTop: "2px solid #eee",
                                        margin: "8px 0"
                                    }}
                                />
                                <div style={{ marginBottom: "2em" }}>
                                    <p style={{ marginBottom: "1em" }} />

                                    <Project>
                                        <ProjectHeader>
                                            <p style={{ fontWeight: 500 }}>
                                                notes on nordhaus-gaddum inequalities for dominating-set counts
                                            </p>

                                            <div className="project-topics">
                                                extremal graph theory
                                                <br />
                                                dominating sets
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "right",
                                                        width: "100%",
                                                        fontSize: "1em",
                                                        marginTop: "auto",
                                                        textDecoration: "underline dotted"
                                                    }}
                                                >
                                                    <span
                                                        style={{ cursor: "pointer" }}
                                                        aria-hidden="true"
                                                        onClick={() => navigate("/home/nordhaus-gaddum-notes")}
                                                    >
                                                        read more →
                                                    </span>
                                                </div>
                                            </div>
                                        </ProjectHeader>

                                        <p style={{ fontFamily: "Satoshi-Variable" }}>
                                            these notes explore the nordhaus-gaddum inequalities for dominating-set
                                            counts, using ideas and terminology from work on common neighborhoods.
                                        </p>
                                    </Project>
                                </div>
                            </div>
                            {/*  */}
                        </div>
                    </div>
                )}
            </div>

            {!isArticleOpen && (
                <div
                    className={styles.containerFooter}
                    style={{
                        left: footerBounds.left,
                        width: footerBounds.width,
                        opacity: showFooter ? 1 : 0,
                        visibility: showFooter ? "visible" : "hidden"
                    }}
                >
                    <p>scroll for more</p>
                </div>
            )}
        </>
    );
};

const Project = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    column-gap: 2rem;
    align-items: start;

    width: 100%;
    min-width: 0;
    margin-bottom: 0;

    & > p {
        grid-column: 1;

        min-width: 0;
        margin-top: 0.8em;

        font-family: "Roboto", sans-serif;
        color: #5f5f5f;
    }

    @media screen and (max-width: 992px) {
        grid-template-columns: minmax(0, 1fr);
        column-gap: 0;
        row-gap: 0.6em;

        & > p {
            grid-column: 1;
            margin-top: 0.4em;
        }
    }
`;

const ProjectHeader = styled.div`
    display: contents;

    & > :first-child {
        grid-column: 1;

        min-width: 0;
        margin-top: 0;
        margin-bottom: 0.2em;

        overflow-wrap: anywhere;
    }

    & > .project-topics {
        grid-column: 2;
        grid-row: 1 / span 100;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        height: 100%;

        text-align: right;
        white-space: nowrap;
    }

    @media screen and (max-width: 992px) {
        & > :first-child {
            grid-column: 1;
        }

        & > .project-topics {
            grid-column: 1;
            grid-row: auto;

            align-items: flex-start;

            width: 100%;
            height: auto;

            text-align: left;
            white-space: normal;
        }

        & > .project-topics > div {
            justify-content: flex-start !important;

            margin-top: 0.6em !important;
        }
    }
`;

export default Home;
