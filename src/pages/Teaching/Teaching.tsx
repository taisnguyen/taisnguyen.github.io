import { useEffect } from "react";
import styled from "styled-components";
import styles from "./Teaching.module.scss";

const Teaching = () => {
    useEffect(() => {
        const experienceContainer = document.getElementsByClassName(styles.experienceContainer)[0] as HTMLDivElement;
        const experienceContainerFooter = document.getElementsByClassName(
            styles.experienceContainerFooter
        )[0] as HTMLDivElement;

        if (!experienceContainer || !experienceContainerFooter) return;
        const isScrollable = experienceContainer.scrollHeight > experienceContainer.clientHeight;
        if (!isScrollable) {
            experienceContainerFooter.style.display = "none";
            return;
        }

        const handleScroll = () => {
            const atTop = experienceContainer.scrollTop === 0;
            experienceContainerFooter.style.opacity = atTop ? "1" : "0";
        };

        // set initial visibility
        handleScroll();
        experienceContainer.addEventListener("scroll", handleScroll);

        return () => {
            experienceContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                    <p style={{ marginBottom: "2em" }}>my teaching experience</p>

                    <div className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                undergraduate course grader&nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>spring 2025</p>
                            </ExperienceHeader>
                            graded and critiqued rigorous, proof-based assignments and exams for COS445: Algorithmic
                            Game Theory.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                undergraduate teaching assistant&nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>fall 2024</p>
                            </ExperienceHeader>
                            held office hours for COS324: Introduction to Machine Learning, assisting students with
                            course material and programming assignments during lab sessions. additionally, assisted in
                            grading assignments and providing feedback to students.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                undergraduate teaching assistant&nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>spring 2024</p>
                            </ExperienceHeader>
                            held office hours for COS217: Introduction to Programming Systems, assisting students with
                            course material and programming assignments during lab sessions.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                undergraduate teaching assistant&nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>fall 2023</p>
                            </ExperienceHeader>
                            held office hours for COS226: Data Structures and Algorithms, assisting students with course
                            material and programming assignments during lab sessions.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>

                        <div style={{ marginBottom: "4rem" }} />
                    </div>
                </div>
            </div>
            <div className={styles.experienceContainerFooter}>
                <p>scroll for more</p>
            </div>
        </>
    );
};

const Experience = styled.div`
    width: 100%;
    margin-bottom: 0;
    & > p {
        font-family: "Roboto", sans-serif;
        color: #5f5f5f;
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    margin-bottom: 0.2em;
`;

export default Teaching;
