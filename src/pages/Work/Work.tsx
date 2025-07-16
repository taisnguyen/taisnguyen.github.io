import React, { useEffect } from "react";
import styles from "./Work.module.scss";

import { ReactComponent as JoyConBaseIcon } from "../../assets/joy-con-base-icon.svg";
import { ReactComponent as JoyConTopIcon } from "../../assets/joy-con-top-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/github-icon.svg";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import Bubble from "../../components/Bubble";
import TypingText from "../../components/TypingText";

const experiences: ExperienceTimeline = {
    "2024": [
        {
            name: "Undergraduate Research Assistant",
            company: "Princeton Cognition in Collectives Lab",
            period: "Summer 2024 – Present",
            description: (
                <>
                    Building infrastructure for online dynamic interactive networks for research in collective
                    psychological processes in large-scale social networks. Collaborated with researchers to study
                    social dynamics and behavior using the platform.
                    <br />
                    <br />
                    Advised by Dr. Alin Coman (
                    <a
                        href="https://psychology.princeton.edu/people/alin-coman"
                        target="_blank"
                        style={{ color: "#81a6f0", fontWeight: 500, textDecoration: "underline" }}
                    >
                        Website
                    </a>
                    ) and Ph.D. Candidate Ari Dyckovsky (
                    <a
                        href="https://www.aridyckovsky.com/"
                        target="_blank"
                        style={{ color: "#81a6f0", fontWeight: 500, textDecoration: "underline" }}
                    >
                        Website
                    </a>
                    ).
                    <br />
                    <br />
                    <span
                        style={{
                            border: "1.6px solid #cff0f9",
                            borderRadius: "0.4rem",
                            backgroundColor: "#cff0f9",
                            padding: "2px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            color: "#4A4A4A"
                        }}
                    >
                        You can check out our progress here:{" "}
                        <a href="https://www.odin.systems/" target="_blank">
                            https://www.odin.systems/
                        </a>
                        .
                    </span>
                </>
            )
        },
        {
            name: "Software Engineer Intern",
            company: "Microsoft",
            period: "Summer 2024",
            description:
                "Extended filtering capabilities for high-demand pub/sub service processing 1 billion requests daily, exposing contract changes for partners to define KQL queries against incoming payload data. Achieved and maintained sub-5ms latencies under 5x-10x production-scale testing and benchmarking."
        }
    ],
    "2023": [
        {
            name: "Software Engineer Intern",
            company: "Fusion Systems Group",
            period: "Summer 2023",
            description:
                "Worked on the restaurant chain management system (F&B SaaS) to build new key features that allow over 1000 restaurants across 4 countries to manage their business operations."
        }
    ],
    "2022": [
        {
            name: "Machine Learning Intern",
            company: "QuantCap LLC",
            period: "Winter 2022",
            description:
                "Responsible for the start-to-finish analysis, design, and implementation of profitable betting strategies, including data collection, data cleaning, featur, model training, and backtesting."
        }
    ],
    "2021": [
        {
            name: "Software Engineer Intern",
            company: "Broward County Public Schools",
            period: "Summer 2021",
            description:
                "Responsible for the extension and management of module-based administrative system (SaaS) during pivotal transition from paper to digital, with technologies including ASP.NET, C#, MSSQL/T-SQL, and JS."
        },
        {
            name: "Engineering Intern",
            company: "Museum of Discovery and Science, Inc.",
            period: "October 2020 – August 2021",
            description:
                "Responsible for designing a project to be implemented in the museum displays, including an AR-based exhibit with technologies including Unity, C#, and Maya."
        }
    ]
};

const TypingTextOptions = ["msft", "fusion systems", "quantcap llc", "bcps", "mods", "cmu"];

const Work = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    work experience @ <br /> <TypingText color="#81a6f0" textOptions={TypingTextOptions} />
                </h1>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(industry) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                im a software engineer with industry experience building scalable and performant
                                systems. below are the positions ive held.
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
                                a lot of my work experience is in fullstack software engineering, where i have built and
                                maintained production systems.
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
                                    191 + (parseInt(year) - 2021) * 8,
                                    224 + (parseInt(year) - 2021) * 8,
                                    205 + (parseInt(year) - 2021) * 22
                                ]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Work;
