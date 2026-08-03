import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../components/ArticleRenderer";
import { InlineMath } from "react-katex";

function section(text: string | React.ReactElement) {
    return <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "0.5em" }}>{text}</div>;
}

const Article = () => {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    return createArticle({
        title: "Notes on Nordhaus-Gaddum Inequalities for Dominating-Set Counts",
        topics: ["Extremal Graph Theory", "Dominating Sets"],
        headerNote:
            "These notes explore the Nordhaus-Gaddum inequalities for dominating-set counts, using ideas and terminology from work on common neighborhoods. (work in progress)",

        references: [
            // {
            //     key: "wagner2013",
            //     sortKey: "Wagner",
            //     text: (
            //         <>
            //             Stephan Wagner. A note on the number of dominating sets of a graph.{" "}
            //             <em>Utilitas Mathematica</em>, 92:25–31, 2013.
            //         </>
            //     )
            // },
            // {
            //     key: "nordhaus1956",
            //     sortKey: "Nordhaus",
            //     text: (
            //         <>
            //             E. A. Nordhaus and J. W. Gaddum. On complementary graphs. <em>American Mathematical Monthly</em>
            //             , 63:175–177, 1956.
            //         </>
            //     )
            // },
            {
                key: "keough2019",
                sortKey: "Keough",
                text: (
                    <>
                        Lauren Keough and David Shane. Toward a Nordhaus–Gaddum inequality for the number of dominating
                        sets. <em>Involve</em>, 12(7):1175–1181, 2019.
                    </>
                )
            }
        ],

        slots: {
            bipartiteCase: () => (
                <span
                    role="a"
                    tabIndex={0}
                    onClick={() => navigate("/home/nordhaus-gaddum")}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setShowMessage((current) => !current);
                        }
                    }}
                    style={{
                        cursor: "pointer",
                        textDecoration: "underline dotted"
                    }}
                >
                    here
                </span>
            ),
            qed: () => (
                <span style={{ float: "right" }}>
                    <InlineMath math="\blacksquare" />
                </span>
            ),
            section1: () => section("1. Introduction"),
            section2: () =>
                section(
                    <>
                        2. Properties of <InlineMath math="\text{ }\nu" />
                    </>
                )
        },

        content: String.raw`
\slot{section1}
For an introduction to the Nordhaus-Gaddum inequalities for dominating-set counts, please see my writeup for the bipartite case \slot{bipartiteCase}.

Without further ado, let us start by defining common neighborhoods.

\bf{Definition 1.1.} Let $G$ be a simple graph and $S \subseteq V(G)$ be a subset of its vertices. Then the \it{common neighborhood} $\mathcal{C}_G(S)$ of $S$ in $G$ is defined by $\mathcal{C}_G(S) = \{ v \in V(G) : \forall s \in S, v \sim_G s \} = \bigcap_{s \in S} N_G(s)$, where $u \sim_G v$ means $u$ is adjacent to $v$ in $G$. By convention, we take $\mathcal{C}_G(\emptyset) = V(G)$.

Recall the definition of a dominating set and denote by $\partial(G)$ the number of dominating sets in $G$. As a reminder, we care about the following conjecture.

\bf{Conjecture 1.2} (\cite{keough2019})\bf{.} For a graph $G$ on $n$ vertices, it holds that
$$
\partial(G) + \partial(\bar{G}) \leq 2(2^{\lfloor n/2 \rfloor} - 1)(2^{\lceil n/2 \rceil} - 1) + 2.
$$

How are common neighborhoods related to dominating sets?

\bf{Lemma 1.3.} Let $G$ be a simple graph and $S \subseteq V(G)$ be a subset of its vertices. Then $S$ dominates $G$ if and only if $\mathcal{C}_{\bar{G}}(S) = \emptyset$.

\it{Proof.} First suppose $S$ dominates $G$ and suppose otherwise that $\mathcal{C}_{\bar{G}}(S) \neq \emptyset$. Fix any $v \in \mathcal{C}_{\bar{G}}(S)$. Since $G$ is simple, we have that $v \notin S$. Since $S$ dominates $G$ but $v \notin S$, there must exist some $u \in S$ such that $u \sim_G v$. But then $u \nsim_{\bar{G}} v$, so it follows that $v \notin \mathcal{C}_{\bar{G}}(S)$, which is a contradiction. Now suppose that $\mathcal{C}_{\bar{G}}(S) = \emptyset$. If $S = V(G)$, we are done, so assume not and fix any $v \in V(G) \setminus S$. We claim that there exists some $u \in S$ such that $u \sim_G v$. Indeed, suppose otherwise. Then it follows that $u \sim_{\bar{G}} v$ for all $u \in S$, which implies that $v \in \mathcal{C}_{\bar{G}}(S)$, which is a contradiction since $\mathcal{C}_{\bar{G}}(S)$ is empty. \slot{qed}

For a simple graph $G$, denote by $\nu(G)$ the number of subsets of $G$ that have a nonempty common neighborhood in $G$. That is, we define
$$
\nu(G) = |\{ S \subseteq V(G) : \mathcal{C}_G(S) \neq \emptyset \}|.
$$

Then by Lemma 1.3, we can rewrite $\partial(G)$ for a simple graph $G$ on $n$ vertices as
$$
\partial(G) = 2^n - \nu(\bar{G}).
$$
Then Conjecture 1.2 can be rewritten for simple graphs $G$.

\bf{Conjecture 1.3.} For a simple graph $G$ on $n$ vertices, it holds that
$$
\nu(G) + \nu(\bar{G}) \geq 2^{n+1} - 2(2^{\lfloor n/2 \rfloor} - 1)(2^{\lceil n/2 \rceil} - 1) - 2.
$$
This moves us away from counting dominating sets to counting nonempty common neighborhoods.

\slot{section2}
Let us explore some properties of $\nu$. For graphs $G$ and $H$, denote by $G + H$ the disjoint union of the two graphs. For some subset $S \subseteq V(G)$, denote by $G[S]$ the subgraph of $G$ induced by S. The following proposition is pretty easy to see.

\bf{Proposition 2.1.} Let $G$ and $H$ be nonempty simple graphs. Then $\nu(G + H) = \nu(G) + \nu(H) - 1$.

\it{Proof.} Fix a subset $\emptyset \neq S \subseteq V(G + H)$. If $S$ is fully contained in $V(G)$, then $\mathcal{C}_{G+H}(S) = \mathcal{C}_G(S)$. And if $S$ is fully contained in $V(H)$, then $\mathcal{C}_{G+H}(S) = \mathcal{C}_H(S)$. If neither is the case, then $\mathcal{C}_{G+H}(S) = \emptyset$, since $(G+H)[V(G)]$ and $(G+H)[V(H)]$ do not have edges between them. Note that the empty subset is counted once in $\nu(G + H)$, but once in each of $\nu(G)$ and $\nu(H)$, so we subtract one. The proposition follows. \slot{qed}

For graphs $G$ and $H$, denote by $G \vee H$ the join of the two graphs, which is constructed by first performing a disjoint union of $G$ and $H$ and then creating an edge $uv$ for each pair $u \in V(G)$ and $v \in V(H)$.

What can we say about $\nu(G \vee H)$? Let us try counting the noncontributing subsets in $G \vee H$. The following lemma will be helpful.

\bf{Lemma 2.2.} Let $G$ and $H$ be simple graphs. Fix any $S \subseteq V(G \vee H)$ and write $S = A \cup B$,
with $A \subseteq V(G)$ and $B \subseteq V(H)$. Then $\mathcal{C}_{G \vee H}(A \cup B) = \mathcal{C}_G(A) \cup \mathcal{C}_{H}(B)$.

\it{Proof.} Fix $v \in \mathcal{C}_{G \vee H}(A \cup B)$. Assume wlog. that $v \in V(G)$. By definition, we have that for all $u \in A \cup B$, it follows that $u \sim_{G \vee H}$ v. Since $v \in V(G)$, it further follows that for all $u \in A$, we have $u \sim_G v$. That is, we have $v \in \mathcal{C}_G(A)$, and thus $\mathcal{C}_{G \vee H}(A \cup B) \subseteq \mathcal{C}_G(A) \cup \mathcal{C}_{H}(B)$. The case for $v \in V(H)$ follows analogously. Now fix $v \in \mathcal{C}_G(A) \cup \mathcal{C}_{H}(B)$. Assume wlog. that $v \in \mathcal{C}_{G}(A)$. By definition, we have that for all $u \in A$, it follows that $u \sim_{G}$ v. By construction, it also holds that $u \sim_{G \vee H} v$ for all $u \in A$. Also by construction, we have that for all $w \in V(H)$, it holds that $w \sim_{G \vee H} v$. That is, we have for all $w \in B$, it holds $w \sim_{G \vee H} v$. Thus, it follows that $\mathcal{C}_G(A) \cup \mathcal{C}_{H}(B) \subseteq \mathcal{C}_{G \vee H}(A \cup B)$. The lemma follows. \slot{qed}

\bf{Proposition 2.3.} Let $G$ and $H$ be simple graphs. Then $\nu(G \vee H) = 2^{|G|+|H|} - (2^{|G|} - \nu(G))(2^{|H|} - \nu(H))$.

\it{Proof.} Fix any subset $S \subseteq V(G \vee H)$ and write $S = A \cup B$, with $A = S \cap V(G)$ and $B = S \cap V(H)$. Then by Lemma~\ref{lem:join_decomposition}, $S$ does not contribute if and only if $\mathcal{C}_G(A) = \emptyset$ and $\mathcal{C}_H(B) = \emptyset$. The number of subsets $A \subseteq V(G)$ with $\mathcal{C}_G(A) = \emptyset$ is $2^{|G|} - \nu(G)$. And similarly, the number of subsets with $B \subseteq V(H)$ with $\mathcal{C}_G(B) = \emptyset$ is $2^{|H|} - \nu(H)$. The choices are independent, so the number of noncontributing subsets of $G \vee H$ is $(2^{|G|} - \nu(G))(2^{|H|} - \nu(H))$. There are $2^{|G| + |H|}$ number of subsets of $G \vee H$, so the number of contributing subsets is $2^{|G|+|H|} - (2^{|G|} - \nu(G))(2^{|H|} - \nu(H))$. \slot{qed}

\it{(to be cont.)}

`
    });
};

// We formalize this in the following proposition.

// For a subset $\emptyset \neq S \subseteq V(G)$, it is clear that $\mathcal{C}_{G}(S) \subseteq \mathcal{C}_{G \vee H}(S)$. (And analogously for $H$). Thus, we can at least say that $\nu(G \vee H) \geq \nu(G) + \nu(H)$. But what if $S$ intersects both $V(G)$ and $V(H)$? Write $S = A \cup B$ with $A \subseteq V(G)$ and $B \subseteq V(H)$. Since each vertex in one part connects to all other vertices in the other part, it follows if $\mathcal{C}_{G}(A) \neq \emptyset$ or $\mathcal{C}_{H}(B) \neq \emptyset$, then $\mathcal{C}_{G \vee H}(S) \neq \emptyset$.

export default Article;
