import React from "react";
import styles from "./Research.module.scss";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import TypingText from "../../components/TypingText";

const experiences: ExperienceTimeline = {
    "2025": [
        {
            name: "Visiting Research Intern",
            company: "Carnegie Mellon Software and Societal Systems Department",
            period: "Summer 2025",
            description: (
                <>
                    Leading R&D on automated test suite generation, using coverage-guided fuzzing and a novel composite
                    input generator mechanism.
                    <br />
                    <br />
                    <span
                        style={{
                            border: "1.6px solid #fae4a9",
                            borderRadius: "0.4rem",
                            backgroundColor: "#fae4a9",
                            padding: "2px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            color: "#4A4A4A"
                        }}
                    >
                        You can check out our progress here:{" "}
                        <a href="https://github.com/nanofuzz/nanofuzz/" target="_blank">
                            https://github.com/nanofuzz/nanofuzz/
                        </a>
                        .
                    </span>
                </>
            )
        },
        {
            name: "Undergraduate Researcher",
            company: "Princeton University",
            period: "Summer 2025",
            description: (
                <>
                    Attacking the Erdos-Klietman conjecture on minimum 3-saturated families of sets.
                    {/* <br />
                    <br />
                    <span
                        style={{
                            border: "1.6px solid #ffffdc",
                            borderRadius: "2rem",
                            backgroundColor: "#ffffdc",
                            padding: "2px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            color: "#4A4A4A"
                        }}
                    >
                        You can check out our progress here:{" "}
                        <a href="https://github.com/nanofuzz/nanofuzz/" target="_blank">
                            https://github.com/nanofuzz/nanofuzz/
                        </a>
                        .
                    </span> */}
                </>
            )
        }
    ],
    "2024": [
        {
            name: "Research Fellow",
            company: "Princeton-TokyoU Artificial Intelligence In Collectives",
            period: "2024 – Present",
            description:
                "Nominated for participation in a Princeton-Tokyo multi-year initiative focused on pioneering interdisciplinary research to enhance individual and collective outcomes through AI."
        },
        {
            name: "Undergraduate Research Assistant",
            company: "Princeton Cognition in Collectives Lab",
            period: "2024 – Present",
            description: (
                <>
                    Building and leading R&D on software infrastructure for online dynamic interactive networks for
                    research in collective psychological processes in large-scale social networks. Collaborated with
                    researchers to study social dynamics and behavior using the platform.
                    <br />
                    <br />
                    <span
                        style={{
                            border: "1.6px solid #fae4a9",
                            borderRadius: "0.4rem",
                            backgroundColor: "#fae4a9",
                            padding: "2px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            color: "#4A4A4A"
                        }}
                    >
                        You can check out our progress here:{" "}
                        <a href="https://www.odin.systems/" target="_blank">
                            https://www.odin.system/
                        </a>
                        .
                    </span>
                </>
            )
        },
        {
            name: "Undergraduate Researcher",
            company: "Princeton Theoretical Computer Science Group",
            period: "2024 – Present",
            description:
                "Analyzed RANDAO bribery auctions in Ethereum, modeling adversarial manipulation of randomness through auction mechanisms. Evaluated auction designs, including VCG and all-pay group bidding, for Sybil-proofness, profit-maximization, and individual rationality."
        }
    ]
};

const TypingTextOptions = ["princeton", "carnegie mellon"];

const Research = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    research @ <br /> <TypingText color="#f0cb81" textOptions={TypingTextOptions} />
                </h1>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(research) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                i am an active researcher throughout the semester and summer, where i work on problems
                                across software engineering and theoretical computer science.
                            </span>
                        </p>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my research interests) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                i am passionate about problems in theoretical computer science and its applications in
                                software engineering.
                            </span>
                        </p>
                    </div>
                </div>
                <div className={styles.experienceContainer}>
                    {Object.keys(experiences)
                        .reverse()
                        .map((year: string) => (
                            <ExperienceYear
                                key={year}
                                year={year}
                                experiences={experiences[year]}
                                stripeColor={[
                                    230 + (parseInt(year) - 2021) * 8,
                                    220 + (parseInt(year) - 2021) * 12,
                                    140 + (parseInt(year) - 2021) * 20
                                ]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Research;
