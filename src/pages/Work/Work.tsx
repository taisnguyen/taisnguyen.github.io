import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import styles from "./Work.module.scss";

const Work = () => {
    const contentBoundsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [showFooter, setShowFooter] = useState(false);
    const [footerBounds, setFooterBounds] = useState({
        left: 0,
        width: 0
    });

    useEffect(() => {
        const contentBounds = contentBoundsRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!contentBounds || !scrollContainer) return;

        let isActive = true;
        let firstAnimationFrame = 0;
        let secondAnimationFrame = 0;

        const updateFooter = () => {
            const rect = contentBounds.getBoundingClientRect();
            const nextBounds = {
                left: rect.left,
                width: rect.width
            };

            setFooterBounds((currentBounds) => {
                if (currentBounds.left === nextBounds.left && currentBounds.width === nextBounds.width) {
                    return currentBounds;
                }

                return nextBounds;
            });

            const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight + 1;
            const shouldShowFooter = isScrollable && scrollContainer.scrollTop <= 1;

            setShowFooter((currentValue) => (currentValue === shouldShowFooter ? currentValue : shouldShowFooter));
        };

        const resizeObserver = new ResizeObserver(updateFooter);

        resizeObserver.observe(contentBounds);
        resizeObserver.observe(scrollContainer);

        if (contentBounds.parentElement) {
            resizeObserver.observe(contentBounds.parentElement);
        }

        Array.from(scrollContainer.children).forEach((child) => {
            resizeObserver.observe(child as Element);
        });

        scrollContainer.addEventListener("scroll", updateFooter);
        window.addEventListener("resize", updateFooter);

        firstAnimationFrame = requestAnimationFrame(() => {
            secondAnimationFrame = requestAnimationFrame(updateFooter);
        });

        void document.fonts?.ready.then(() => {
            if (isActive) updateFooter();
        });

        return () => {
            isActive = false;

            cancelAnimationFrame(firstAnimationFrame);
            cancelAnimationFrame(secondAnimationFrame);

            scrollContainer.removeEventListener("scroll", updateFooter);
            window.removeEventListener("resize", updateFooter);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div ref={contentBoundsRef} className={styles.introduction}>
                    <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                    <p style={{ marginBottom: "2em" }}>my work experience</p>

                    <div ref={scrollContainerRef} className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>incoming software engineer</p>&nbsp;@&nbsp;imc trading
                                <p style={{ marginLeft: "auto" }}>august 2026</p>
                            </ExperienceHeader>
                            low-latency execution platform.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>software engineer intern</p>&nbsp;@&nbsp;microsoft
                                <p style={{ marginLeft: "auto" }}>summer 2024</p>
                            </ExperienceHeader>
                            extended filtering capabilities for high-demand pub/sub service processing 1 billion
                            requests daily, exposing contract changes for partners to define kql queries against
                            incoming payload data. achieved and maintained sub-5ms latencies under 5x-10x
                            production-scale testing and benchmarking.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>software engineer intern</p>&nbsp;@&nbsp;fusion systems
                                group
                                <p style={{ marginLeft: "auto" }}>summer 2023</p>
                            </ExperienceHeader>
                            worked on the restaurant chain management system (f&b saas) to build new key features that
                            allow over 1000 restaurants across 4 countries to manage their business operations.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>machine learning intern</p>&nbsp;@&nbsp;quantcap llc
                                <p style={{ marginLeft: "auto" }}>winter 2023</p>
                            </ExperienceHeader>
                            responsible for the start-to-finish analysis, design, and implementation of profitable
                            betting strategies, including data collection, data cleaning, featur, model training, and
                            backtesting.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>software engineer intern</p>&nbsp;@&nbsp;broward county
                                public schools
                                <p style={{ marginLeft: "auto" }}>summer 2021</p>
                            </ExperienceHeader>
                            responsible for the extension and management of module-based administrative system (saas)
                            during pivotal transition from paper to digital, with technologies including asp.net, c#,
                            mssql/t-sql, and js.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>engineering intern</p>&nbsp;@&nbsp;museum of discovery
                                and science
                                <p style={{ marginLeft: "auto" }}>october 2020 - august 2021</p>
                            </ExperienceHeader>
                            responsible for designing a project to be implemented in the museum displays, including an
                            ar-based exhibit with technologies including unity, c#, and maya.
                        </Experience>
                        <div style={{ marginBottom: "4rem" }} />
                    </div>
                </div>
            </div>
            <div
                className={`${styles.experienceContainerFooter} ${showFooter ? styles.footerVisible : ""}`}
                style={{
                    left: footerBounds.left,
                    width: footerBounds.width
                }}
            >
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
