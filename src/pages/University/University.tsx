import { useEffect } from "react";
import styled from "styled-components";
import styles from "./University.module.scss";

const University = () => {
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
                    <p style={{ marginBottom: "2em" }}>my university activities</p>

                    <div className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                icpc greater new york regional competitor&nbsp;@&nbsp;icpc
                                <p style={{ marginLeft: "auto" }}>fall 2024 - spring 2025</p>
                            </ExperienceHeader>
                            qualified and competed in the international collegiate programming competition (icpc)
                            greater new york regional, representing princeton university, after having qualified through
                            the local competition held on campus.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                lead software engineer&nbsp;@&nbsp;hack4impact
                                <p style={{ marginLeft: "auto" }}>fall 2023 - spring 2025</p>
                            </ExperienceHeader>
                            hack4impact connects student software developers with non-profits and other socially
                            responsible businesses to develop powerful new tools for social change. i led a project
                            enabling NJTree non-profit to manage their tree planting and logging operations.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                lead software engineer&nbsp;@&nbsp;the daily princetonian
                                <p style={{ marginLeft: "auto" }}>fall 2022 - fall 2024</p>
                            </ExperienceHeader>
                            the daily princetonian is the largest independent student newspaper of princeton university.
                            i am responsible for building and maintaining web apps that serve over 2400 daily users.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                start-up ios/android developer&nbsp;@&nbsp;getpupil inc.
                                <p style={{ marginLeft: "auto" }}>summer 2023 - fall 2023</p>
                            </ExperienceHeader>
                            pupil is a startup that serves fgli and other marginalized students and provides a platform
                            for mentor/mentees of similar backgrounds to interact. i was responsible for working on the
                            product for the release of the mvp that will serve over 1200 registered users.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                spaceport america cup competitor&nbsp;@&nbsp;princeton rocketry club
                                <p style={{ marginLeft: "auto" }}>fall 2023 - spring 2024</p>
                            </ExperienceHeader>
                            designing and implementing dashboard application to communicate with and display avionics
                            and during-flight data to on-ground team. working to launch fully team-built rocket to up to
                            30,000 feet, deploying drone payload, and recovering both.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                director & project manager&nbsp;@&nbsp;resinde
                                <p style={{ marginLeft: "auto" }}>spring 2023 - fall 2023</p>
                            </ExperienceHeader>
                            resinde is princeton university's campus community for design & product thinking. i led a
                            subteam for the official princeton university's Site Builder (PSB), where i am responsible
                            for managing a team of over 7 developers and ui/ux researchers.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                national & states champion programming&nbsp;@&nbsp;bpa
                                <p style={{ marginLeft: "auto" }}>fall 2021 - spring 2022</p>
                            </ExperienceHeader>
                            participated in programming competitions on the regional, states, and national levels,
                            hosted by the business professionals of america (bpa). won 1st place nationals (US) C++
                            competition & 7th place nationals (US) python competition & 1st place states (FL) C++
                            competition & 1st place states (FL) python competition.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}

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

export default University;
