import React, { useEffect } from "react";
import styles from "./Home.module.scss";

const Home = () => {
    useEffect(() => {
        const container = document.getElementsByClassName(styles.content)[0] as HTMLDivElement;
        const containerFooter = document.getElementsByClassName(styles.containerFooter)[0] as HTMLDivElement;

        if (!container || !containerFooter) return;
        const isScrollable = container.scrollHeight > container.clientHeight;
        if (!isScrollable) {
            containerFooter.style.display = "none";
            return;
        }

        const handleScroll = () => {
            const atTop = container.scrollTop === 0;
            containerFooter.style.opacity = atTop ? "1" : "0";
        };

        // set initial visibility
        handleScroll();
        container.addEventListener("scroll", handleScroll);

        return () => {
            container.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                    <p style={{ marginBottom: "2em" }}>incoming swe @ imc</p>
                    <div className={styles.content}>
                        <div style={{ marginBottom: "2em" }}>
                            <p
                                style={{
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                about me <br />
                            </p>
                            <p>
                                im a senior at princeton university studying computer science and mathematics. ive
                                worked on both practical systems and theoretical problems, and im especially interested
                                in where the two meet! ill be joining imc as a full-time software engineer after
                                graduation, working on their low-latency trading systems.
                            </p>
                        </div>
                        <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        <div style={{ marginBottom: "2em" }}>
                            <p
                                style={{
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                my experiences <br />
                            </p>
                            my background is spread across software engineering and research. i have interned at
                            microsoft, where i worked on latency-critical distributed systems, and at princeton,
                            carnegie mellon, uiuc, where i built and led r&d projects across labs.
                        </div>
                        {/* <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        <div style={{ marginBottom: "2em" }}>
                            <p
                                style={{
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                my activities <br />
                            </p>
                            outside of work, i enjoy developing for a smaller community on campus. i am the lead
                            software engineer for the daily princetonian, the lead software engineer for hack4impact,
                            and a member of princeton's acm chapter. i enjoy competing in the intercollegiate
                            programming contest and enjoy teaching as a course assistant throughout my time at
                            princeton.
                        </div> */}
                        <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        <div style={{ marginBottom: "2em" }}>
                            <p
                                style={{
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                my interests <br />
                            </p>
                            other interests of mine include badminton, ping pong, and chess. i also enjoy playing video
                            games, especially roguelites. (some of my favorites:{" "}
                            <a
                                href="https://en.wikipedia.org/wiki/Slay_the_Spire"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                slay the spire
                            </a>
                            ,{" "}
                            <a
                                href="https://en.wikipedia.org/wiki/Balatro"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                balatro
                            </a>
                            ,{" "}
                            <a
                                href="https://en.wikipedia.org/wiki/Dead_Cells"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                dead cells
                            </a>
                            , and{" "}
                            <a
                                href="https://en.wikipedia.org/wiki/Risk_of_Rain"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                            >
                                risk of rain
                            </a>
                            ).
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.containerFooter}>
                <p>scroll for more</p>
            </div>
        </>
    );
};

export default Home;
