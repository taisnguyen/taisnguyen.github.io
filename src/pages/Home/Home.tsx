import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                <p style={{ marginBottom: "2em" }}>incoming swe @ imc</p>
                <div style={{ marginBottom: "2em" }}>
                    <p style={{ textDecoration: "underline dotted" }}>
                        about me <br />
                    </p>
                    <p>
                        im a senior at princeton university studying computer science and mathematics. ive worked on
                        both practical systems and theoretical problems, and im especially interested in where the two
                        meet! ill be joining imc as a full-time software engineer after graduation, working on their
                        low-latency trading systems.
                    </p>
                </div>
                <div style={{ marginBottom: "2em" }}>
                    <p style={{ textDecoration: "underline dotted" }}>
                        my experiences <br />
                    </p>
                    my background is spread across software engineering and research. i have interned at microsoft,
                    where i worked on high-demand distributed systems, and at princeton and carnegie mellon, where i
                    built and led r&d projects across labs. i have also worked on theoretical problems in auction theory
                    and combinatorics.
                </div>

                <div style={{ marginBottom: "2em" }}>
                    <p style={{ textDecoration: "underline dotted" }}>
                        my activities <br />
                    </p>
                    outside of work, i enjoy developing for a smaller community on campus. i am the lead software
                    engineer for the daily princetonian, the lead software engineer for hack4impact, and a member of
                    princeton's acm chapter. i enjoy competing in the intercollegiate programming contest and enjoy
                    teaching as a course assistant throughout my time at princeton.
                </div>

                <div style={{ marginBottom: "2em" }}>
                    <p style={{ textDecoration: "underline dotted" }}>
                        my interests <br />
                    </p>
                    other interests of mine include badminton, ping pong, and chess. i also enjoy playing video games,
                    especially roguelites.
                </div>
            </div>
        </div>
    );
};

export default Home;
