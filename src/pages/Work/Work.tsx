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
            name: "Incoming Software Engineer Intern",
            company: "Microsoft",
            period: "Summer 2024",
            description: "To be added."
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

const TypingTextOptions = ["msft", "fusion systems", "quantcap llc", "bcps", "mods"];

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
                            <span style={{ fontWeight: 600 }}>(industry) </span>im a software engineer with industry
                            experience building scalable, performant web applications. below are the positions ive held.
                        </p>
                        <p>
                            <span style={{ fontWeight: 600 }}>(my experiences) </span> a lot of my work experience is in
                            fullstack development, with an emphasis on saas development. though i am always exploring
                            new areas!
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
