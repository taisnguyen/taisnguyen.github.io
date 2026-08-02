import React, { useEffect, useRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "./Article.module.scss";

const Article = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [footerBounds, setFooterBounds] = useState({
        left: 0,
        width: 0
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const articleBodyRef = useRef<HTMLDivElement>(null);
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const pageContainer = containerRef.current;
        const container = contentRef.current;
        const articleBody = articleBodyRef.current;

        if (!pageContainer || !container || !articleBody) return;

        const updateFooter = () => {
            const isScrollable = container.scrollHeight > container.clientHeight + 1;

            const isAtTop = container.scrollTop <= 1;

            const rect = pageContainer.getBoundingClientRect();

            setFooterBounds({
                left: rect.left,
                width: rect.width
            });

            setShowFooter(isScrollable && isAtTop);
        };

        const resizeObserver = new ResizeObserver(updateFooter);

        container.addEventListener("scroll", updateFooter);
        window.addEventListener("resize", updateFooter);

        resizeObserver.observe(pageContainer);
        resizeObserver.observe(container);
        resizeObserver.observe(articleBody);

        if (pageContainer.parentElement) {
            resizeObserver.observe(pageContainer.parentElement);
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(updateFooter);
        });

        void document.fonts?.ready.then(updateFooter);

        return () => {
            container.removeEventListener("scroll", updateFooter);
            window.removeEventListener("resize", updateFooter);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.container}>
            <div className={styles.fixedHeader}>
                <div className={styles.introduction}>
                    <p style={{ fontWeight: 500, color: "#4a4a4a" }}>
                        Nordhaus-Gaddum Inequalities for Dominating-Set Counts in Bipartite Graphs
                    </p>

                    <p className={styles.topics}>
                        <span className={styles.topicsLabel}>Topics:</span>
                        <span className={styles.topic}>Extremal Graph Theory</span>
                        <span className={styles.topic}>Dominating Sets</span>
                        <span className={styles.topic}>Bipartite Graphs</span>
                    </p>
                </div>

                <p className={styles.preprint}>
                    A preprint of this paper is available on arXiv:{" "}
                    <a href="https://arxiv.org/abs/2607.25188/" target="_blank" rel="noreferrer">
                        https://arxiv.org/abs/2607.25188
                    </a>
                    . This writeup is much more verbose than the preprint, but omits some results.
                </p>

                <hr className={styles.headerDivider} />
            </div>

            <div ref={contentRef} className={styles.content}>
                <div ref={articleBodyRef} className={styles.articleBody}>
                    {/* CONTENT START */}
                    <p>
                        <span style={{ fontWeight: 500 }}>Definition 1.1.</span> Let <InlineMath math="G" /> be some
                        graph. A subset of its vertices <InlineMath math="S \subseteq V(G)" /> is{" "}
                        <span style={{ fontStyle: "italic" }}>dominating</span> if each vertex in{" "}
                        <InlineMath math="G" /> is either in <InlineMath math="S" /> or adjacent to a vertex in{" "}
                        <InlineMath math="S" />.
                    </p>
                    <br />
                    <p>
                        Nordhaus-Gaddum inequalities relate the values of a graph parameter on a graph and its
                        complement. The original Nordhaus-Gaddum inequalities established bounds on the sum and product
                        of the chromatic numbers of a graph and its complement [1]. They showed that for a graph{" "}
                        <InlineMath math="G" /> on <InlineMath math="n" /> vertices, the following inequalities hold:
                        <BlockMath math="2 \sqrt{n}\leq \chi(G) + \chi(\bar{G}) \leq n + 1" />
                        and
                        <BlockMath math="n \leq \chi(G) \cdot \chi(\bar{G}) \leq \left(\frac{n + 1}{2}\right)^2" />
                        where <InlineMath math="\chi(G)" /> is the chromatic number of <InlineMath math="G" />.
                    </p>
                    <br />
                    <p>
                        In this writeup, we discuss Nordhaus-Gaddum inequalities for the number of dominating sets in a
                        graph. Denote by <InlineMath math="\partial(G)" /> the number of dominating sets in a graph{" "}
                        <InlineMath math="G" />. Wagner [3] showed that every graph <InlineMath math="G" /> on{" "}
                        <InlineMath math="n" /> vertices satisfies
                        <BlockMath math="\partial(G) + \partial(\bar{G}) \geq 2^n." />
                        Keough and Shane subsequently established the following upper bound.
                    </p>
                    <br />
                    <p>
                        <span style={{ fontWeight: 500 }}>Theorem 1.2</span> ([3])
                        <span style={{ fontWeight: 500 }}>.</span> For a graph <InlineMath math="G" /> on{" "}
                        <InlineMath math="n" /> vertices, it holds that
                        <BlockMath math="\partial(G) + \partial(\bar{G}) \leq 2^{n + 1} - 2^{\lfloor n/2 \rfloor} - 2^{\lceil n/2 \rceil -1}." />
                    </p>
                    <p>
                        They note that they do not expect this upper bound to be tight, and they conjecture that the
                        following stronger upper bound holds.
                    </p>
                    <br />
                    <p>
                        <span style={{ fontWeight: 500 }}>Conjecture 1.3</span> ([3])
                        <span style={{ fontWeight: 500 }}>.</span> For a graph <InlineMath math="G" /> on{" "}
                        <InlineMath math="n" /> vertices, it holds that
                        <BlockMath math="\partial(G) + \partial(\bar{G}) \leq 2(2^{\lfloor n/2 \rfloor} - 1) (2^{\lceil n/2 \rceil} - 1) + 2." />
                    </p>
                    <p>
                        In this writeup, we partially resolve this conjecture for the bipartite case. We will go through
                        the proof and look to motivate each step. We will show the following result.
                    </p>
                    <br />
                    <p>
                        <span style={{ fontWeight: 500 }}>Theorem 1.4.</span> For a bipartite graph{" "}
                        <InlineMath math="G" /> with nonempty bipartition <InlineMath math="(A,B)" />, it holds that
                        <BlockMath math="\partial(G) + \partial(\bar{G}) \leq 2(2^{|A|} - 1) (2^{|B|} - 1) + 2." />
                    </p>
                    <p>
                        Observe that the right-hand side is maximized when both parts are as balanced as possible. That
                        is, if <InlineMath math="n = |A| + |B|" />, then we have
                        <BlockMath
                            math={String.raw`
                                \begin{align*}
                                    \partial(G) + \partial(\bar{G})
                                    &\leq 2(2^{|A|} - 1)(2^{|B|} - 1) + 2 \\
                                    &\leq 2(2^{\lfloor n/2 \rfloor} - 1)
                                    (2^{\lceil n/2 \rceil} - 1) + 2.
                                \end{align*}
                            `}
                        />
                    </p>
                    <p>
                        Let us go back to Wagner's result. Fix some subset <InlineMath math="S \subseteq V(G)" />. Then
                        it holds that <InlineMath math="S" /> dominates <InlineMath math="G" /> or{" "}
                        <InlineMath math="\bar{S}" /> dominates <InlineMath math="\bar{G}" />. Indeed, suppose that{" "}
                        <InlineMath math="S" /> does not dominate <InlineMath math="G" />. Then it holds that for all{" "}
                        <InlineMath math="v \in V(\bar{G}) \setminus \bar{S} = S" />, there exists{" "}
                        <InlineMath math="u \in \bar{S}" /> such that <InlineMath math="uv \in E(\bar{G})" />. To see
                        this, observe that the negation is that there exists some <InlineMath math="v \in S" /> such
                        that for all <InlineMath math="u \in \bar{S}" />, it holds that{" "}
                        <InlineMath math="uv \in E(G)" />. But this would imply that <InlineMath math="S" /> dominates{" "}
                        <InlineMath math="G" />.
                    </p>
                    <br />
                    <p>
                        Since there are <InlineMath math="2^n" /> possible subsets of the vertices of{" "}
                        <InlineMath math="G" />, and each subset either dominates <InlineMath math="G" /> or its
                        complement, we have that
                        <BlockMath math="\partial(G) + \partial(\bar{G}) \geq 2^n." />
                    </p>
                    <p>
                        This suggests us to rewrite the left-hand side as
                        <BlockMath math="\partial(G) + \partial(\bar{G}) = 2^n + |\Upsilon(G,\bar{G})|" />
                        where we define
                        <BlockMath math="\Upsilon(G,\bar{G}) = \{S \subseteq V(G) : S \text{ dominates } G \text{ and } \bar{S} \text{ dominates } \bar{G}\}." />
                    </p>
                    <br />
                    <p>
                        Then to prove Theorem 1.4, it suffices to show that
                        <BlockMath math="|\Upsilon(G,\bar{G})| \leq (2^{|A|} - 2)(2^{|B|} - 2). \tag{1.4.1}" />
                        (You can plug in and do a bit of algebra to see this.)
                    </p>
                    <br />
                    <p>
                        Now let us get to proving. We will take <InlineMath math="G" /> to be a bipartite graph with
                        nonempty bipartition <InlineMath math="(A,B)" />. Let us assume{" "}
                        <InlineMath math="|A|,|B| \geq 2" />, which we will find helpful later in the proof. We will
                        revisit the case where <InlineMath math="|A| = 1" /> or <InlineMath math="|B| = 1" />.
                    </p>
                    <br />
                    <p>
                        A nice observation about the right-hand side of <InlineMath math="(1.4.1)" /> is that it counts
                        the number of interior subsets of <InlineMath math="G." /> Let us define the set{" "}
                        <InlineMath math="\mathcal{P} = \{ (X,Y) : \emptyset \neq X \subsetneq A, \emptyset \neq Y \subsetneq B \}" />
                        , which has size <InlineMath math="(2^{|A|} - 2)(2^{|B|} - 2)" />. Let{" "}
                        <InlineMath math="\mathcal{I} \subseteq \mathcal{P}" /> be those pairs{" "}
                        <InlineMath math="(X,Y)" /> such that <InlineMath math="X \cup Y" /> dominates{" "}
                        <InlineMath math="G" />. Note that for any <InlineMath math="(X,Y) \in \mathcal{P}" />, it also
                        holds that <InlineMath math="\overline{X \cup Y}" /> dominates <InlineMath math="\bar{G}" />.
                        Indeed, since <InlineMath math="\emptyset \neq X \subsetneq A" /> and{" "}
                        <InlineMath math="\emptyset \neq Y \subsetneq B" />, we have that
                        <BlockMath math="\overline{X \cup Y} = (A \setminus X )\cup (B \setminus Y)" />
                        contains at least one vertex from each of <InlineMath math="A" /> and <InlineMath math="B" />.
                        Since both <InlineMath math="A" /> and <InlineMath math="B" /> induce cliques in{" "}
                        <InlineMath math="\bar{G}" />, any set intersecting both parts dominates{" "}
                        <InlineMath math="\bar{G}" />.
                    </p>
                    <br />
                    <p>
                        Okay, now what are we missing? We still need to account for those members of{" "}
                        <InlineMath math="\Upsilon(G, \bar{G})" /> that fully contain <InlineMath math="A" /> or{" "}
                        <InlineMath math="B" />. Let us define
                        <BlockMath
                            math="    \mathcal{L}
    =
    \left\{
    L\subsetneq A :
    L\cup B\in\Upsilon(G,\bar{G})
    \right\}
    \ \ \text{and} \ \
    \mathcal{R}
    =
    \left\{
    R\subsetneq B :
    A\cup R\in\Upsilon(G,\bar{G})
    \right\}."
                        />
                    </p>
                    <p>
                        Let us summarize:
                        <br />
                        <div style={{ paddingLeft: "2em", paddingTop: "0.5em" }}>
                            <InlineMath math="\bullet \, \text{ The set } \mathcal{P} \text{ represents the interior subsets of } G." />
                            <br />
                            <InlineMath math="\bullet \, \text{ The set } \mathcal{I}\subseteq \mathcal{P} \text{ represents the interior subsets of } G \text{ that are also in } \Upsilon(G, \bar{G})." />
                            <br />
                            <InlineMath math="\bullet \, \text{ The set } \mathcal{L} \text{ represents the strict subsets of } G \text{ that fully contain } B \text{ and that are also in } \Upsilon(G, \bar{G})." />
                            <br />
                            <InlineMath math="\bullet \, \text{ The set } \mathcal{R} \text{ represents the strict subsets of } G \text{ that fully contain } A \text{ and that are also in } \Upsilon(G, \bar{G})." />
                        </div>
                    </p>
                    <br />
                    <p>
                        But none of the above sets account for <InlineMath math="A \cup B" /> or the empty set. Can
                        these ever be in <InlineMath math="\Upsilon(G, \bar{G})" />? Since <InlineMath math="G" /> is
                        nonempty, the answer is no.
                    </p>
                    <br />
                    <p>
                        Now the key observation is that each member of <InlineMath math="\Upsilon(G, \bar{G})" />{" "}
                        corresponds uniquely either to a pair in <InlineMath math="\mathcal{I}" />, to an element{" "}
                        <InlineMath math="L \in \mathcal{L}" /> via <InlineMath math="L \mapsto L \cup B" />, or to an
                        element <InlineMath math="R \in \mathcal{R}" /> via <InlineMath math="R \mapsto A \cup R" />.
                        Thus we get
                        <BlockMath math="|\Upsilon(G, \bar{G})| = |\mathcal{I}| + |\mathcal{L}| + |\mathcal{R}|." />
                    </p>
                    <p>
                        Let us recall what we need to show:
                        <BlockMath
                            math="
                        \begin{alignat*}{2}

                       && |\Upsilon(G, \bar{G})| &\leq (2^{|A|} - 2)(2^{|B|} - 2) \\
                       &\Leftrightarrow \quad &|\mathcal{I}| + |\mathcal{L}| + |\mathcal{R}| &\leq |\mathcal{P}|.
                        \end{alignat*}
                        "
                        />
                    </p>
                    <br />
                    <p>
                        We now want to compare the members of <InlineMath math="\mathcal{L} \cup \mathcal{R}" /> with
                        the members of <InlineMath math="\mathcal{P} \setminus \mathcal{I}" />. Recall that{" "}
                        <InlineMath math="\mathcal{P} \setminus \mathcal{I}" /> represents the interior pairs{" "}
                        <InlineMath math="(X,Y)" /> such that <InlineMath math="X \cup Y" /> does not dominate{" "}
                        <InlineMath math="G" />. One first idea might be to construct an injection from{" "}
                        <InlineMath math="\mathcal{L}" /> into <InlineMath math="\mathcal{P} \setminus \mathcal{I}" />,
                        and then separately construct an injection from <InlineMath math="\mathcal{R}" /> into{" "}
                        <InlineMath math="\mathcal{P} \setminus \mathcal{I}" />. This would show that
                        <BlockMath
                            math="
                                |\mathcal{P}|-|\mathcal{I}|
                                \geq
                                \max\{|\mathcal{L}|,|\mathcal{R}|\}.
                            "
                        />
                        But this does not work fully. Instead, we need a bound on{" "}
                        <InlineMath math="|\mathcal{L}|+|\mathcal{R}|" />, and the images of the two injections could
                        overlap. A useful observation is instead of constructing one copy of{" "}
                        <InlineMath math="\mathcal{R}" /> inside <InlineMath math="\mathcal{P} \setminus \mathcal{I}" />
                        , we construct one disjoint copy for every vertex of <InlineMath math="A" />. This would give
                        the stronger inequality
                        <BlockMath math="|\mathcal{P}|-|\mathcal{I}| \geq |A||\mathcal{R}|." />
                        By symmetry, we would also get
                        <BlockMath math="|\mathcal{P}|-|\mathcal{I}| \geq |B||\mathcal{L}|." />
                    </p>
                    <p>Let us work on showing the following lemma.</p>
                    <br />
                    <p>
                        <span style={{ fontWeight: 500 }}>Lemma 1.5.</span> Assume that{" "}
                        <InlineMath math="|A|,|B| \geq 2" />. Then
                        <BlockMath math="|\mathcal{P}|-|\mathcal{I}| \geq |\mathcal{L}|+|\mathcal{R}|." />
                    </p>
                    <br />
                    <p>
                        <span style={{ fontStyle: "italic" }}>Proof.</span> We begin by showing that
                        <BlockMath math="|\mathcal{P}|-|\mathcal{I}| \geq |A||\mathcal{R}|. \tag{1.5.1}" />
                        Fix some vertex <InlineMath math="a \in A" />. We construct a map{" "}
                        <InlineMath math="\phi_a:\mathcal{R}\to \mathcal{P}\setminus\mathcal{I}" />, which we will show
                        is injective. For nonempty <InlineMath math="R\in\mathcal{R}" />, we define
                        <BlockMath math="\phi_a(R)=(\{a\},R)." />
                        Since <InlineMath math="\emptyset\neq R\subsetneq B" /> and{" "}
                        <InlineMath math="\{a\}\subsetneq A" />, since <InlineMath math="|A|\geq 2" />, it follows that{" "}
                        <InlineMath math="\phi_a(R)\in\mathcal{P}." /> It remains to show that this pair does not belong
                        to <InlineMath math="\mathcal{I}" />. That is, we show that <InlineMath math="\{a\}\cup R" />{" "}
                        does not dominate <InlineMath math="G" />. Since <InlineMath math="R\in\mathcal{R}" />, we know
                        by definition that <InlineMath math="A\cup R\in\Upsilon(G,\bar{G})." /> Therefore, the
                        complement of <InlineMath math="A\cup R" /> dominates <InlineMath math="\bar{G}" />. This
                        complement is
                        <BlockMath math="\overline{A\cup R}=B\setminus R." />
                        So <InlineMath math="B\setminus R" /> dominates <InlineMath math="\bar{G}" />. The vertex{" "}
                        <InlineMath math="a" /> does not belong to <InlineMath math="B\setminus R" />. Since{" "}
                        <InlineMath math="B\setminus R" /> dominates <InlineMath math="\bar{G}" />, there must be some
                        vertex <InlineMath math="b\in B\setminus R" /> such that <InlineMath math="ab\in E(\bar{G})." />{" "}
                        So we have <InlineMath math="ab\notin E(G)." />
                    </p>
                    <br />
                    <p>
                        Now consider the set <InlineMath math="\{a\}\cup R" /> in <InlineMath math="G" />. The vertex{" "}
                        <InlineMath math="b" /> does not belong to this set because <InlineMath math="b\notin R" />.
                        Moreover, <InlineMath math="b" /> is not adjacent in <InlineMath math="G" /> to{" "}
                        <InlineMath math="a" />, as we just showed. And finally, <InlineMath math="b" /> is not adjacent
                        to any vertex of <InlineMath math="R" />, since both <InlineMath math="b" /> and every vertex of{" "}
                        <InlineMath math="R" /> is in <InlineMath math="B" />, and <InlineMath math="G" /> has no edges
                        in <InlineMath math="B" />.
                    </p>
                    <br />
                    <p>
                        Thus <InlineMath math="b" /> is not dominated by <InlineMath math="\{a\}\cup R" />, so{" "}
                        <InlineMath math="\phi_a(R)=(\{a\},R)\in\mathcal{P}\setminus\mathcal{I}." />
                    </p>
                    <br />
                    <p>
                        There is one case that we still need to handle. It is possible that{" "}
                        <InlineMath math="\emptyset\in\mathcal{R}" />. We cannot define{" "}
                        <InlineMath math="\phi_a(\emptyset)=(\{a\},\emptyset)," /> since this is not the right shape for{" "}
                        <InlineMath math="\mathcal{P}" />. Then, suppose that{" "}
                        <InlineMath math="\emptyset\in\mathcal{R}" />. By the definition of{" "}
                        <InlineMath math="\mathcal{R}" />, this means{" "}
                        <InlineMath math="A=A\cup\emptyset\in\Upsilon(G,\bar{G})" />, so it follows that its complement{" "}
                        <InlineMath math="B" /> dominates <InlineMath math="\bar{G}" />. Since{" "}
                        <InlineMath math="a\notin B" />, there exists some vertex <InlineMath math="b_a\in B" /> such
                        that <InlineMath math="ab_a\in E(\bar{G})" />. That is, <InlineMath math="ab_a\notin E(G)." />{" "}
                        For this case, we define <BlockMath math="\phi_a(\emptyset)=(\{a\},B\setminus\{b_a\})." />
                    </p>
                    <p>
                        Because <InlineMath math="|B|\geq 2" />, the set <InlineMath math="B\setminus\{b_a\}" /> is both
                        nonempty and a strict subset of <InlineMath math="B" />. Also, because{" "}
                        <InlineMath math="|A|\geq 2" />, the set <InlineMath math="\{a\}" /> is a strict subset of{" "}
                        <InlineMath math="A" />. Thus we get <InlineMath math="\phi_a(\emptyset)\in\mathcal{P}." />
                    </p>
                    <br />
                    <p>
                        Also, the vertex <InlineMath math="b_a" /> is not dominated in <InlineMath math="G" /> by{" "}
                        <InlineMath math="\{a\}\cup(B\setminus\{b_a\})." /> Indeed, <InlineMath math="b_a" /> is not
                        adjacent to <InlineMath math="a" />, and it has no neighbors in{" "}
                        <InlineMath math="B\setminus\{b_a\}" /> because there are no edges within{" "}
                        <InlineMath math="B" />. Therefore, it holds that
                        <BlockMath math="\phi_a(\emptyset)\in\mathcal{P}\setminus\mathcal{I}." />
                    </p>
                    <p>
                        We have now defined <InlineMath math="\phi_a" /> on all of <InlineMath math="\mathcal{R}" />.
                        Now let us show that it is injective. Distinct nonempty sets in{" "}
                        <InlineMath math="\mathcal{R}" /> clearly have distinct images, since{" "}
                        <InlineMath math="\phi_a(R)=(\{a\},R)" />. The only possible collision is between the image of{" "}
                        <InlineMath math="\emptyset" /> and the image of a nonempty member. So, such a collision would
                        require that
                        <BlockMath math="B\setminus\{b_a\}\in\mathcal{R}." />
                    </p>
                    <p>
                        Suppose, by way of contradiction, that this is the case. Then, by the definition of{" "}
                        <InlineMath math="\mathcal{R}" />,
                        <BlockMath math="A\cup(B\setminus\{b_a\})\in\Upsilon(G,\bar{G})." />
                        The complement of this set is the singleton <InlineMath math="\{b_a\}" />, so{" "}
                        <InlineMath math="\{b_a\}" /> must dominate <InlineMath math="\bar{G}" />. It follows that{" "}
                        <InlineMath math="b_a" /> is adjacent in <InlineMath math="\bar{G}" /> to every vertex of{" "}
                        <InlineMath math="A" />. Or equivalently, <InlineMath math="b_a" /> has no neighbor in{" "}
                        <InlineMath math="A" /> in the graph <InlineMath math="G" />.
                    </p>
                    <br />
                    <p>
                        Conversely, the set <InlineMath math="A\cup(B\setminus\{b_a\})" /> must dominate{" "}
                        <InlineMath math="G" />. The only vertex outside this set is <InlineMath math="b_a" />. Since
                        there are no edges within <InlineMath math="B" />, the only way for <InlineMath math="b_a" /> to
                        be dominated is for it to have a neighbor in <InlineMath math="A" />. This contradicts the
                        preceding paragraph. Therefore, we get that
                        <BlockMath math="B\setminus\{b_a\}\notin\mathcal{R}," />
                        and thus <InlineMath math="\phi_a" /> is injective.
                    </p>
                    <br />
                    <p>
                        Note the images corresponding to distinct vertices of <InlineMath math="A" /> are disjoint. Thus{" "}
                        <InlineMath math="\mathcal{P}\setminus\mathcal{I}" /> contains <InlineMath math="|A|" />{" "}
                        disjoint images of <InlineMath math="\mathcal{R}" />, each having size{" "}
                        <InlineMath math="|\mathcal{R}|" />. So it follows that
                        <BlockMath
                            math={String.raw`
                                |\mathcal{P}|-|\mathcal{I}|
                                =
                                |\mathcal{P}\setminus\mathcal{I}|
                                \geq
                                |A||\mathcal{R}|.
                            `}
                        />
                        This proves <InlineMath math="(1.5.1)" />. By symmetry, we also get
                        <BlockMath math="|\mathcal{P}|-|\mathcal{I}| \geq |B||\mathcal{L}|. \tag{1.5.2}" />
                    </p>
                    <p>
                        Combining <InlineMath math="(1.5.1)" /> and <InlineMath math="(1.5.2)" />, we obtain
                        <BlockMath
                            math={String.raw`
                                |\mathcal{P}|-|\mathcal{I}|
                                \geq
                                \max\{|A||\mathcal{R}|,\ |B||\mathcal{L}|\}.
                            `}
                        />
                        We now show that
                        <BlockMath
                            math={String.raw`
                                \max\{|A||\mathcal{R}|,\ |B||\mathcal{L}|\}
                                \geq
                                |\mathcal{L}|+|\mathcal{R}|.
                            `}
                        />
                    </p>
                    <p>
                        If <InlineMath math="\mathcal{L}=\emptyset" />, then{" "}
                        <InlineMath math="|\mathcal{L}|+|\mathcal{R}|=|\mathcal{R}|" /> and{" "}
                        <InlineMath
                            math="
                                |A||\mathcal{R}|
                                \geq
                                |\mathcal{R}|
                                =
                                |\mathcal{L}|+|\mathcal{R}|.
                            "
                        />{" "}
                        Similarly, if <InlineMath math="\mathcal{R}=\emptyset" />, then{" "}
                        <InlineMath math="|B||\mathcal{L}|" /> is at least{" "}
                        <InlineMath math="|\mathcal{L}|+|\mathcal{R}|" />. So assume that both{" "}
                        <InlineMath math="\mathcal{L}" /> and <InlineMath math="\mathcal{R}" /> are nonempty. Suppose
                        otherwise that neither term in the maximum is large enough. That is, suppose that
                        <BlockMath
                            math="
                                |B||\mathcal{L}|
                                <
                                |\mathcal{L}|+|\mathcal{R}|
                            "
                        />
                        and
                        <BlockMath
                            math="
                                |A||\mathcal{R}|
                                <
                                |\mathcal{L}|+|\mathcal{R}|.
                            "
                        />
                        Rearranging the first inequality gives
                        <BlockMath
                            math="
                                (|B|-1)|\mathcal{L}|<|\mathcal{R}|,
                        "
                        />
                        and rearranging the second inequality gives
                        <BlockMath
                            math="
                                (|A|-1)|\mathcal{R}|<|\mathcal{L}|.
                        "
                        />
                    </p>
                    <p>
                        Since both <InlineMath math="|\mathcal{L}|" /> and <InlineMath math="|\mathcal{R}|" /> are
                        positive, we multiply these inequalities, which gives
                        <BlockMath
                            math="
                                (|A|-1)(|B|-1)
                                |\mathcal{L}||\mathcal{R}|
                                <
                                |\mathcal{L}||\mathcal{R}|.
                            "
                        />
                        Dividing by <InlineMath math="|\mathcal{L}||\mathcal{R}|>0" />, we obtain
                        <BlockMath math="(|A|-1)(|B|-1)<1." />
                        But <InlineMath math="|A|,|B|\geq 2" />, so both <InlineMath math="|A|-1" /> and{" "}
                        <InlineMath math="|B|-1" /> are at least one. Contradiction!
                    </p>
                    <br />
                    <p>
                        Therefore, it follows that
                        <BlockMath
                            math="
                                |\mathcal{P}|-|\mathcal{I}|
                                \geq
                                \max\{|A||\mathcal{R}|,\ |B||\mathcal{L}|\}
                                \geq
                                |\mathcal{L}|+|\mathcal{R}|.
                            "
                        />
                        The lemma follows.
                        <span style={{ float: "right" }}>
                            <InlineMath math="\blacksquare" />
                        </span>
                    </p>
                    <br />
                    <p>We now have everything that we need to prove Theorem 1.4.</p>
                    <br />
                    <p>
                        <span style={{ fontStyle: "italic" }}>Proof of Theorem 1.4</span>. First assume that{" "}
                        <InlineMath math="|A|,|B|\geq 2" />. Recall that
                        <BlockMath math="|\Upsilon(G,\bar{G})|=|\mathcal{I}|+|\mathcal{L}|+|\mathcal{R}|." />
                        By Lemma 1.5, we have that
                        <BlockMath math="|\mathcal{L}|+|\mathcal{R}|\leq|\mathcal{P}|-|\mathcal{I}|." />
                        Plugging in, we get
                        <BlockMath
                            math="
                                \begin{align*}
                                    |\Upsilon(G,\bar{G})|
                                    &=
                                    |\mathcal{I}|+|\mathcal{L}|+|\mathcal{R}|\\
                                    &\leq
                                    |\mathcal{I}|+
                                    \left(|\mathcal{P}|-|\mathcal{I}|\right)\\
                                    &=
                                    |\mathcal{P}|\\
                                    &=
                                    (2^{|A|}-2)(2^{|B|}-2).
                                \end{align*}
                            "
                        />
                        We now consider the case where one part has size one. First assume that{" "}
                        <InlineMath math="|A|=1" /> and write <InlineMath math="A=\{a\}" />. We claim that{" "}
                        <InlineMath math="\Upsilon(G,\bar{G})=\emptyset." /> Suppose otherwise that there exists some{" "}
                        <InlineMath math="S\in\Upsilon(G,\bar{G})" />. Consider the two cases:
                    </p>
                    <div style={{ paddingLeft: "2em", paddingTop: "0.5em", color: "#4a4a4a" }}>
                        <p>
                            <span style={{ fontWeight: 500 }}>Case 1.</span> <InlineMath math="a\in S" />.
                        </p>
                        <p>
                            Because <InlineMath math="S\in\Upsilon(G,\bar{G})" />, its complement{" "}
                            <InlineMath math="\overline{S}" /> dominates <InlineMath math="\bar{G}" />. The vertex{" "}
                            <InlineMath math="a" /> does not belong to <InlineMath math="\overline{S}" />, so there must
                            be some vertex <InlineMath math="b\in\overline{S}" /> such that{" "}
                            <InlineMath math="ab\in E(\bar{G})." /> Since <InlineMath math="A=\{a\}" />, the vertex{" "}
                            <InlineMath math="b" /> must belong to <InlineMath math="B" />. Moreover,{" "}
                            <InlineMath math="ab\notin E(G)." /> So <InlineMath math="b" /> is not dominated by{" "}
                            <InlineMath math="S" /> in <InlineMath math="G" />. It does not belong to{" "}
                            <InlineMath math="S" /> because <InlineMath math="b\in\overline{S}" />. It is not adjacent
                            to <InlineMath math="a," /> and it cannot be adjacent to any vertex of{" "}
                            <InlineMath math="S\cap B" /> because there are no edges within <InlineMath math="B" />.
                            Thus <InlineMath math="S" /> does not dominate <InlineMath math="G" />. Contradiction!
                        </p>
                        <br />
                        <p>
                            <span style={{ fontWeight: 500 }}>Case 2.</span> <InlineMath math="a\notin S" />.
                        </p>
                        <p>
                            In this case, <InlineMath math="S\subseteq B" />. Since <InlineMath math="S" /> dominates{" "}
                            <InlineMath math="G" />, we must have <InlineMath math="S=B" />. Indeed, if some vertex{" "}
                            <InlineMath math="b\in B\setminus S" /> existed, then <InlineMath math="b" /> would not
                            belong to <InlineMath math="S" /> and would have no neighbor in{" "}
                            <InlineMath math="S\subseteq B" />, because <InlineMath math="G" /> has no edges within{" "}
                            <InlineMath math="B" />. So it follows that <InlineMath math="S=B" /> and{" "}
                            <InlineMath math="\overline{S}=\{a\}" />. Since <InlineMath math="S" /> dominates{" "}
                            <InlineMath math="G" /> and <InlineMath math="a\notin S" />, there must exist some{" "}
                            <InlineMath math="b\in B" /> such that <InlineMath math="ab\in E(G)." /> Conversely,{" "}
                            <InlineMath math="\overline{S}=\{a\}" /> dominates <InlineMath math="\bar{G}" />. Since{" "}
                            <InlineMath math="b\notin\{a\}" />, it follows <InlineMath math="ab\in E(\bar{G})." />{" "}
                            Contradiction!
                        </p>
                    </div>
                    <br />
                    <p>
                        Thus for <InlineMath math="|A|=1" />, it holds that{" "}
                        <InlineMath math="\Upsilon(G,\bar{G})=\emptyset." /> The case <InlineMath math="|B|=1" />{" "}
                        follows by symmetry.
                    </p>
                    <br />
                    <p>
                        Finally, we recall that
                        <BlockMath math="\partial(G)+\partial(\bar{G})=2^{|A|+|B|}+|\Upsilon(G,\bar{G})|." />
                        Plugging in, we get
                        <BlockMath
                            math={String.raw`
                                \begin{align*}
                                    \partial(G)+\partial(\bar{G})
                                    &=
                                    2^{|A|+|B|}
                                    +
                                    |\Upsilon(G,\bar{G})|\\
                                    &\leq
                                    2^{|A|+|B|}
                                    +
                                    (2^{|A|}-2)(2^{|B|}-2)\\
                                    &=
                                    2(2^{|A|}-1)(2^{|B|}-1)+2.
                                \end{align*}
                            `}
                        />
                        <span style={{ float: "right" }}>
                            <InlineMath math="\blacksquare" />
                        </span>
                    </p>
                    {/* <p>
                        We will work to show that{" "}
                        <InlineMath math="|\mathcal{L}| + |\mathcal{R}| \leq |\mathcal{P}| - |\mathcal{I}|" />. The plan
                        is to show the following chain of statements:
                        <div style={{ paddingLeft: "2em", paddingTop: "0.5em" }}>
                            <InlineMath math="1. \, |\mathcal{L}| \hspace{1.5pt}\leq |\mathcal{P}| - |\mathcal{I}|." />
                            <br />
                            <InlineMath math="2. \, |\mathcal{R}| \leq |\mathcal{P}| - |\mathcal{I}|." />
                            <br />
                            <InlineMath math="\hphantom{3.} (\text{from } 1 \text{ and } 2) \Rightarrow \, \max\{|\mathcal{L}|,|\mathcal{R}|\} \leq |\mathcal{P}| - |\mathcal{I}|." />
                            <br />
                            <InlineMath math="3. \, |\mathcal{L}| + |\mathcal{R}| \leq \max\{|\mathcal{L}|,|\mathcal{R}|\}." />
                            <br />
                        </div>
                    </p>
                    <br />
                    <p>
                        To show the first statement, we construct an injective map <InlineMath math="\phi" /> from{" "}
                        <InlineMath math="\mathcal{L}" /> to <InlineMath math="\mathcal{P} \setminus \mathcal{I}" />.
                    </p> */}

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* CONTENT END */}
                    <div className={styles.references}>
                        <div className={styles.referencesTitle}>
                            <p>References</p>
                        </div>

                        <div>
                            [1] E. A. Nordhaus and J. W. Gaddum. On complementary graphs.{" "}
                            <span style={{ fontStyle: "italic" }}>American Mathematical Monthly</span>, 63:175–177,
                            1956.
                        </div>

                        <div>
                            [2] Stephan Wagner. A note on the number of dominating sets of a graph.{" "}
                            <span style={{ fontStyle: "italic" }}>Utilitas Mathematica</span>, 92:25–31, 2013.
                        </div>

                        <div>
                            [3] Lauren Keough and David Shane. Toward a Nordhaus–Gaddum inequality for the number of
                            dominating sets. <span style={{ fontStyle: "italic" }}>Involve</span>, 12(7):1175–1181,
                            2019.
                        </div>
                    </div>
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

export default Article;
