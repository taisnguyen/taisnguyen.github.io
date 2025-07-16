import React from "react";
import styles from "./University.module.scss";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import TypingText from "../../components/TypingText";

const experiences: ExperienceTimeline = {
    "2024": [
        {
            name: "ICPC Greater New York Regional Competitor",
            company: "Intercollegiate Programming Contest (ICPC)",
            period: "Summer 2024",
            description:
                "Qualified and competed in the ICPC Greater New York Regional, representing Princeton University."
        }
    ],
    "2023": [
        {
            name: "Lead Software Engineer",
            company: "Hack4Impact",
            period: "Fall 2023 – Spring 2025",
            description:
                "Hack4Impact connects student software developers with non-profits and other socially responsible businesses to develop powerful new tools for social change. I lead a project enabling NJTree non-profit to manage their tree planting and logging operations."
        },
        {
            name: "Spaceport America Cup Competitor",
            company: "Princeton Rocketry Club",
            period: "Fall 2023 – Spring 2024",
            description:
                "Designing and implementing dashboard application to communicate with and display avionics and during-flight data to on-ground team. Working to launch fully team-built rocket to up to 30,000 feet, deploying drone payload, and recovering both."
        },
        {
            name: "Director & Project Manager",
            company: "ResInDe",
            period: "Spring 2023 – Fall 2023",
            description:
                "ResInDe is Prince University's campus community for design & product thinking. Currently, I lead a subteam for the official Princeton University’s Site Builder (PSB), where I am responsible for managing a team of over 7 developers and UI/UX researchers."
        }
    ],
    "2022": [
        {
            name: "Lead Software Engineer",
            company: "The Daily Princetonian Publishing Co.",
            period: "Fall 2022 – Fall 2024",
            description:
                "The Daily Princetonian is the largest independent student newspaper of Princeton University. I am responsible for building and maintaining web apps that serve over 2400 daily users."
        },
        {
            name: "Start-Up iOS/Android Developer",
            company: "Pupil (GetPupil Inc.)",
            period: "Fall 2022 – Summer 2023",
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

const TypingTextOptions = ["the daily princetonian", "bpa", "resinde", "rocketry", "hack4impact"];

const University = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    university activities @ <br /> <TypingText color="#89cfa9" textOptions={TypingTextOptions} />
                </h1>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(academics) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                im as much a software engineer as i am a student. i actively research in theoretical
                                computer science and software engineering at princeton.
                            </span>
                        </p>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my activities) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                outside of industry, i enjoy developing for a smaller community on campus. below are the
                                student organizations im involved in.
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
                                    137 + (parseInt(year) - 2021) * 8,
                                    207 + (parseInt(year) - 2021) * 12,
                                    169 + (parseInt(year) - 2021) * 20
                                ]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default University;
