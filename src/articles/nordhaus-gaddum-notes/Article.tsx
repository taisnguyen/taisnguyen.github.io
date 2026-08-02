import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../components/ArticleRenderer";
import { InlineMath } from "react-katex";

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
            )
        },

        content: String.raw`
For an introduction to the Nordhaus-Gaddum inequalities for dominating-set counts, please see my writeup for the bipartite case \slot{bipartiteCase}.

Without further ado, let us start with defining common neighborhoods.

\bf{Definition 1.1.} Let $G$ be a simple graph and $S \subseteq V(G)$ be a subset of its vertices. Then the \it{common neighborhood} $\mathcal{C}_G(S)$ of $S$ in $G$ is defined by $\mathcal{C}_G(S) = \{ v \in V(G) : \forall s \in S, v \sim_G s \} = \bigcap_{s \in S} N_G(s)$, where $u \sim_G v$ means $u$ is adjacent to $v$ in $G$.

Recall the definition of a dominating set and denote $\partial(G)$ as the number of dominating sets in $G$. As a reminder, we care about the following conjecture.

\bf{Conjecture 1.2} (\cite{keough2019})\bf{.} For a graph $G$ on $n$ vertices, it holds that
$$
\partial(G) + \partial(\bar{G}) \leq 2(2^{\lfloor n/2 \rfloor} - 1)(2^{\lceil n/2 \rceil} - 1) + 2.
$$

Now let us ask ourselves: how are common neighborhoods related to dominating sets?

\bf{Lemma 1.3.} Let $G$ be a simple graph and $S \subseteq V(G)$ be a subset of its vertices. Then $S$ dominates $G$ if and only if $\mathcal{C}_{\bar{G}}(S) = \emptyset$.

\it{Proof.} First suppose $S$ dominates $G$ and suppose otherwise that $\mathcal{C}_{\bar{G}}(S) \neq \emptyset$. Fix any $v \in \mathcal{C}_{\bar{G}}(S)$. Since $G$ is simple, we have that $v \notin S$. Since $S$ dominates $G$ but $v \notin S$, there must exist some $u \in S$ such that $u \sim_G v$. But then $u \nsim_{\bar{G}} v$, so it follows that $v \notin \mathcal{C}_{\bar{G}}(S)$, which is a contradiction. Now suppose that $\mathcal{C}_{\bar{G}}(S) = \emptyset$. If $S = V(G)$, we are done, so assume not and fix any $v \in V(G) \setminus S$. We claim that there exists some $u \in S$ such that $u \sim_G v$. Indeed, suppose otherwise. Then it follows that $u \sim_{\bar{G}} v$ for all $u \in S$, which implies that $v \in \mathcal{C}_{\bar{G}}(S)$, which is a contradiction since $\mathcal{C}_{\bar{G}}(S)$ is empty. \slot{qed}

For a simple graph $G$, denote $\nu(G)$ as the number of subsets of $G$ that have a nonempty common neighborhood in $G$. That is, we define
$$
\nu(G) = |\{ S \subseteq V(G) : \mathcal{C}_G(S) \neq \emptyset \}|.
$$

Then by Lemma 1.3, we can rewrite $\partial(G)$ for simple graphs $G$ as
$$
\partial(G) = 2^n - \nu(\bar{G}).
$$
Then Conjecture 1.2 can be rewritten for simple graphs $G$ as

\bf{Conjecture 1.3.} For a simple graph $G$ on $n$ vertices, it holds that
$$
\nu(G) + \nu(\bar{G}) \geq 2^{n+1} - 2(2^{\lfloor n/2 \rfloor} - 1)(2^{\lceil n/2 \rceil} - 1) - 2.
$$

\it{(to be cont.)}

`
    });
};

export default Article;
