import { useEffect } from "react";
import styled from "styled-components";
import styles from "./Research.module.scss";

const Research = () => {
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
                    <p style={{ marginBottom: "2em" }}>my research experience</p>

                    <div className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>visiting research intern</p>&nbsp;@&nbsp;uiuc siebel
                                school of computing
                                <p style={{ marginLeft: "auto" }}>summer 2026 - present</p>
                            </ExperienceHeader>
                            scaling massive network analysis.
                            <br /> <br />
                            advised by Dr. George Chacko (
                            <a
                                href="https://siebelschool.illinois.edu/about/people/faculty/chackoge"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ) and Dr. Tandy Warnow (
                            <a
                                href="https://siebelschool.illinois.edu/about/people/faculty/warnow"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ).
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>visiting research intern</p>&nbsp;@&nbsp;cmu societal
                                systems department
                                <p style={{ marginLeft: "auto" }}>summer 2025 - present</p>
                            </ExperienceHeader>
                            r&d on automated test suite generation, using coverage-guided fuzzing and a novel composite
                            input generator mechanism.
                            <br /> <br />
                            advised by Dr. Brad A. Myers (
                            <a
                                href="https://www.cs.cmu.edu/~bam/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ), Dr. Joshua Sunshine (
                            <a
                                href="https://www.cs.cmu.edu/~jssunshi/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ), and Ph.D. Candidate Matthew C. Davis (
                            <a
                                href="https://cmumatt.github.io/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ). you can check out our progress here:{" "}
                            <a
                                href="https://github.com/nanofuzz/nanofuzz/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                https://github.com/nanofuzz/nanofuzz/
                            </a>
                            .
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate research assistant</p>
                                &nbsp;@&nbsp;princeton cognition in collectives lab
                                <p style={{ marginLeft: "auto" }}>summer 2024 - nov. 2025</p>
                            </ExperienceHeader>
                            building infrastructure for online dynamic interactive networks for research in collective
                            psychological processes in large-scale social networks. collaborated with researchers to
                            study social dynamics and behavior using the platform. <br /> <br />
                            advised by Dr. Alin Coman (
                            <a
                                href="https://psychology.princeton.edu/people/alin-coman"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ) and Ph.D. Candidate Ari Dyckovsky (
                            <a
                                href="https://www.aridyckovsky.com/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ). <br />
                            you can check out our progress here:{" "}
                            <a
                                href="https://www.odin.systems/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                https://www.odin.systems/
                            </a>
                            .{/* <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} /> */}
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate researcher</p>&nbsp;@&nbsp;princeton
                                theoretical computer science group
                                <p style={{ marginLeft: "auto" }}>2024 - 2025</p>
                            </ExperienceHeader>
                            analyzed randao bribery auctions in ethereum, modeling adversarial manipulation of
                            randomness through auction mechanisms. evaluated auction designs, including vcg and all-pay
                            group bidding, for sybil-proofness, profit-maximization, and individual rationality.
                            <br /> <br />
                            advised by Dr. Matthew S. Weinberg (
                            <a
                                href="https://www.cs.princeton.edu/~smattw/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ), Ph.D. Candidate Kaya Alpturer (
                            <a
                                href="https://kalpturer.github.io/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ), and Ph.D. Candidate Jingyi Liu (
                            <a
                                href="https://jingyirose.github.io/"
                                style={{
                                    fontWeight: 300,
                                    textDecoration: "underline dotted",
                                    textDecorationThickness: 1
                                }}
                                target="_blank"
                            >
                                website
                            </a>
                            ).
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
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

export default Research;
