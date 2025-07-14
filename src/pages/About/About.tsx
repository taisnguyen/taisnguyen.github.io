import React, { useEffect } from "react";
import styles from "./About.module.scss";

import { ReactComponent as JoyConBaseIcon } from "../../assets/joy-con-base-icon.svg";
import { ReactComponent as JoyConTopIcon } from "../../assets/joy-con-top-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/github-icon.svg";

import Bubble from "../../components/Bubble";
import TypingText from "../../components/TypingText";

const TypingTextOptions = ["pton", "dining hall", "msft", "friend center", "dorm", "cmu"];

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    tai sanh nguyen @ <br />
                    <TypingText textOptions={TypingTextOptions} color="#eb7b7b" />
                </h1>
                <div className={styles.links}>
                    <Bubble color="#f0cb81" fill="#f0cb81">
                        <p>researcher</p>
                    </Bubble>
                    <Bubble color="#89cfa9" fill="#89cfa9">
                        <p>software engineer</p>
                    </Bubble>
                    <Bubble color="#e18d8b" fill="#e18d8b">
                        <p>theoretician</p>
                    </Bubble>
                    <Bubble color="#8facf4" fill="#8facf4">
                        <p>maths enthusiast</p>
                    </Bubble>
                </div>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(about me) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                im a rising senior at princeton university studying computer science and mathematics.
                                ive worked on both practical systems and theoretical problems, and im especially
                                interested in where the two meet.
                            </span>
                        </p>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my experiences) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                my background is spread across software engineering and research. i have interned at
                                microsoft, where i worked on high-demand distributed systems, and at princeton and
                                carnegie mellon, where i built and led r&d projects across labs. i have also worked on
                                theoretical problems in auction theory and combinatorics.
                            </span>
                        </p>
                    </div>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my activities) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                outside of work, i enjoy developing for a smaller community on campus. i am the lead
                                software engineer for the daily princetonian, the lead software engineer for
                                hack4impact, and a member of princeton's acm chapter. i enjoy competing in the
                                intercollegiate programming contest and enjoy teaching as a course assistant throughout
                                my time at princeton.
                            </span>
                        </p>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my interests) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                other interests of mine include badminton, ping pong, and chess. i also enjoy playing
                                video games, especially roguelites.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
