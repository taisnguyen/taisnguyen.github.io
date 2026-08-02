import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../components/ArticleRenderer";

const Article = () => {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    return createArticle({
        title: "Nordhaus-Gaddum Inequalities for Dominating-Set Counts in Cographs",
        topics: ["Extremal Graph Theory", "Dominating Sets", "Cographs"],
        headerNote:
            "These notes explore the Nordhaus-Gaddum inequalities for dominating-set counts in cographs, using ideas and terminology from work on common neighborhoods. (work in progress)",

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
            )
        },

        content: String.raw`
For an introduction to the Nordhaus-Gaddum inequalities for dominating-set counts, please see my writeup for the bipartite case \slot{bipartiteCase}.

Without further ado, let us start with defining common neighborhoods.

\bf{Definition 1.1.} Let $G$ be a simple graph and $S \subseteq V(G)$ of its vertices. Then the \it{common neighborhood} $\mathcal{C}(S)$ of $S$ is defined by $\mathcal{C}(S) = \{ v \in V(G) : \forall s \in S, v \sim s \} = \bigcap_{s \in S} N(s)$.

Recall the definition of a dominating set and denote $\partial(G)$ to be the number of dominating sets in $G$. As a reminder, we care about the following conjecture.

\bf{Conjecture 1.2} (\cite{keough2019})\bf{.} For a graph $G$ on $n$ vertices, it holds that
$$
\partial(G) + \partial(\bar{G}) \leq 2(2^{\lfloor n/2 \rfloor} - 1)(2^{\lceil n/2 \rceil} - 1) + 2.
$$

Now let us ask ourselves: how are common neighborhoods related to dominating sets?

\bf{Lemma 1.3.} Let $G$ be a simple graph.


\it{(to be cont.)}

`
    });
};

export default Article;
