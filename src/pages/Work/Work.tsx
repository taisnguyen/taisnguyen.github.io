import React from "react";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import styles from "./Work.module.scss";

import { ReactComponent as WorkBagIcon } from "../../assets/work-bag-icon.svg";

const experiences: ExperienceTimeline = {
    "2023": [
        {
            name: "Software Engineer Intern",
            company: "Fusion Systems Group",
            period: "Summer 2023",
            description:
                "Worked on the restaurant chain management system (F&B SaaS) to build new key features that allow over 1000 restaurants across 4 countries to manage their business operations."
        }
        // {
        //     name: "iOS/Android Developer",
        //     company: "GetPupil Inc.",
        //     period: "March 2023 — Present",
        //     description:
        //         "Pupil is a startup that serves FGLI and other marginalized students and provides a platform for mentor/mentees of similar backgrounds to interact. These past months, I have been responsible for working on the product for the release of the MVP that will serve over 1200 registered users."
        // },
        // {
        //     name: "Software Engineer",
        //     company: "The Daily Princetonian Publishing Co.",
        //     period: "September 2022 — Present",
        //     description:
        //         "The Daily Princetonian is the largest independent student newspaper of Princeton University. I am responsible for building and maintaining web apps that serve over 2400 daily users."
        // }
    ],
    "2022": [
        {
            name: "Machine Learning Intern",
            company: "QuantCap LLC",
            period: "Winter 2022",
            description:
                "Responsible for the start-to-finish analysis, design, and implementation of profitable betting strategies, including data collection, data cleaning, feature engineering, model training, and backtesting."
        }
    ],
    "2021": [
        {
            name: "Software Engineering Intern",
            company: "Broward County Public Schools",
            period: "Summer 2021",
            description:
                "Responsible for the extension and management of module-based administrative system (SaaS) during pivotal transition from paper to digital, with technologies including ASP.NET, C#, MSSQL/T-SQL, and JS."
        },
        {
            name: "Engineering Intern",
            company: "Museum of Discovery and Science, Inc.",
            period: "October 2020 — August 2021",
            description:
                "Responsible for designing a project to be implemented in the museum displays, including an AR-based exhibit with technologies including Unity, C#, and Maya."
        }
    ]
};

const Work = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.introductionContainer}>
                <p>
                    My <b>work experience</b>.
                </p>
                <div>
                    <WorkBagIcon style={{ width: "1.02em", height: "1.02em", transform: "translate(1px, 8px)" }} />
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
    );
};

export default Work;
