import React from "react";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import styles from "./University.module.scss";

import { ReactComponent as WorkBagIcon } from "../../assets/work-bag-icon.svg";

const experiences: ExperienceTimeline = {
    "2023": [
        {
            name: "Software Engineer",
            company: "Hack4Impact",
            period: "Fall 2023 — Present",
            description:
                "Hack4Impact connects student software developers with non-profits and other socially responsible businesses to develop powerful new tools for social change. I am currently working on a project to help NJTree non-profit manage their tree planting and logging operations."
        },
        {
            name: "Spaceport America Cup Competitor",
            company: "Princeton Rocketry Club",
            period: "Fall 2023 — Present",
            description:
                "Designing and implementing dashboard application to communicate with and display avionics and during-flight data to on-ground team. Working to launch fully team-built rocket to up to 30,000 feet, deploying drone payload, and recovering both."
        },
        {
            name: "Director & Project Manager",
            company: "ResInDe",
            period: "Spring 2023 — Present",
            description:
                "ResInDe is Prince University's campus community for design & product thinking. Currently, I lead a subteam for the official Princeton University’s Site Builder (PSB), where I am responsible for managing a team of over 7 developers and UI/UX researchers."
        }
    ],
    "2022": [
        {
            name: "Software Engineer",
            company: "The Daily Princetonian Publishing Co.",
            period: "Fall 2022 — Present",
            description:
                "The Daily Princetonian is the largest independent student newspaper of Princeton University. I am responsible for building and maintaining web apps that serve over 2400 daily users."
        },
        {
            name: "Start-Up iOS/Android Developer",
            company: "Pupil (GetPupil Inc.)",
            period: "Fall 2022 — Summer 2023",
            description:
                "Pupil is a startup that serves FGLI and other marginalized students and provides a platform for mentor/mentees of similar backgrounds to interact. I have been responsible for working on the product for the release of the MVP that will serve over 1200 registered users."
        }
    ],
    "2021": [
        {
            name: "National & States Champion Programming",
            company: "Business Professionals of America (BPA)",
            period: "2021",
            description:
                "Attend programming competitions on the regional, states, and national levels, hosted by the Business Professionals of America. Won 1st Place Nationals (US) C++ Competition & 7th Place Nationals (US) Python Competition & 1st Place States (FL) C++ Competition & 1st Place States (FL) Python Competition."
        }
    ]
};

const Work = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.introductionContainer}>
                <p>
                    My <b>university activities</b>.
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
