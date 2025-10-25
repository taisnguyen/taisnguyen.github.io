import { useEffect } from "react";
import styled from "styled-components";
import styles from "./Work.module.scss";

const Work = () => {
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
                    <p style={{ marginBottom: "2em" }}>my work experience</p>

                    <div className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                incoming swe&nbsp;@&nbsp;imc trading
                                <p style={{ marginLeft: "auto" }}>august 2026</p>
                            </ExperienceHeader>
                            low-latency execution platform
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                undergraduate research assistant&nbsp;@&nbsp;princeton cognition in collectives lab
                                <p style={{ marginLeft: "auto" }}>summer 2024 - present</p>
                            </ExperienceHeader>
                            building infrastructure for online dynamic interactive networks for research in collective
                            psychological processes in large-scale social networks. collaborated with researchers to
                            study social dynamics and behavior using the platform. <br /> <br />
                            advised by Dr. Alin Coman (
                            <a
                                href="https://psychology.princeton.edu/people/alin-coman"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted"
                                }}
                            >
                                website
                            </a>
                            ) and Ph.D. Candidate Ari Dyckovsky (
                            <a
                                href="https://www.aridyckovsky.com/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted"
                                }}
                            >
                                website
                            </a>
                            ). <br />
                            you can check out our progress here:{" "}
                            <a
                                href="https://www.odin.systems/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted"
                                }}
                            >
                                https://www.odin.systems/
                            </a>
                            .{/* <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} /> */}
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                software engineer intern&nbsp;@&nbsp;microsoft
                                <p style={{ marginLeft: "auto" }}>summer 2024</p>
                            </ExperienceHeader>
                            extended filtering capabilities for high-demand pub/sub service processing 1 billion
                            requests daily, exposing contract changes for partners to define kql queries against
                            incoming payload data. achieved and maintained sub-5ms latencies under 5x-10x
                            production-scale testing and benchmarking.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                software engineer intern&nbsp;@&nbsp;fusion systems group
                                <p style={{ marginLeft: "auto" }}>summer 2023</p>
                            </ExperienceHeader>
                            worked on the restaurant chain management system (f&b saas) to build new key features that
                            allow over 1000 restaurants across 4 countries to manage their business operations.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                machine learning intern&nbsp;@&nbsp;quantcap llc
                                <p style={{ marginLeft: "auto" }}>winter 2023</p>
                            </ExperienceHeader>
                            responsible for the start-to-finish analysis, design, and implementation of profitable
                            betting strategies, including data collection, data cleaning, featur, model training, and
                            backtesting.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                software engineer intern&nbsp;@&nbsp;broward county public schools
                                <p style={{ marginLeft: "auto" }}>summer 2021</p>
                            </ExperienceHeader>
                            responsible for the extension and management of module-based administrative system (saas)
                            during pivotal transition from paper to digital, with technologies including asp.net, c#,
                            mssql/t-sql, and js.
                            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                engineering intern&nbsp;@&nbsp;museum of discovery and science
                                <p style={{ marginLeft: "auto" }}>october 2020 - august 2021</p>
                            </ExperienceHeader>
                            responsible for designing a project to be implemented in the museum displays, including an
                            ar-based exhibit with technologies including unity, c#, and maya.
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

export default Work;
