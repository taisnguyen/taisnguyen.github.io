import React from "react";
import styles from "./Teaching.module.scss";

import ExperienceYear, { ExperienceTimeline } from "../../components/ExperienceYear";
import TypingText from "../../components/TypingText";

const experiences: ExperienceTimeline = {
    "2025": [
        {
            name: "Undergraduate Course Grader",
            company: "Princeton Computer Science Department",
            period: "Spring 2025",
            description: (
                <>
                    Graded and critiqued rigorous, proof-based assignments and exams for COS445: Algorithmic Game
                    Theory.
                </>
            )
        }
    ],
    "2024": [
        {
            name: "Undergraduate Teaching Assistant",
            company: "Princeton Computer Science Department",
            period: "Fall 2024",
            description: (
                <>
                    Held office hours for COS324: Introduction to Machine Learning, assisting students with course
                    material and programming assignments during lab sessions. Additionally, assisted in grading
                    assignments and providing feedback to students.
                </>
            )
        },
        {
            name: "Undergraduate Teaching Assistant",
            company: "Princeton Computer Science Department",
            period: "Spring 2024",
            description: (
                <>
                    Held office hours for COS217: Introduction to Programming Systems, assisting students with course
                    material and programming assignments during lab sessions.
                </>
            )
        }
    ],
    "2023": [
        {
            name: "Undergraduate Teaching Assistant",
            company: "Princeton Computer Science Department",
            period: "Fall 2023",
            description: (
                <>
                    Held office hours for COS226: Data Structures and Algorithms, assisting students with course
                    material and programming assignments during lab sessions.
                </>
            )
        }
    ]
};

const TypingTextOptions = ["princeton"];

const Teaching = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    teaching @ <br /> <TypingText color="#86C9F3" textOptions={TypingTextOptions} />
                </h1>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 500 }}>(teaching) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                throughout my time at princeton, i have been involved in teaching and course
                                development.
                            </span>
                        </p>
                        <p>
                            <span style={{ fontWeight: 500 }}>(my motivation) </span>
                            <span
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 400,
                                    color: "4A4A4A"
                                }}
                            >
                                i enjoy teaching and mentoring students, as it allows me to share my knowledge and
                                experience with others, while also learning from their perspectives and questions.
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
                                    174 + (parseInt(year) - 2023) * 8,
                                    211 + (parseInt(year) - 2023) * 12,
                                    243 + (parseInt(year) - 2023) * 20
                                ]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Teaching;
