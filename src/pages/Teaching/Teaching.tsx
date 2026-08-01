import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import styles from "./Teaching.module.scss";

const Teaching = () => {
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
                    <p style={{ marginBottom: "2em" }}>my teaching experience</p>

                    <div ref={scrollContainerRef} className={styles.experienceContainer}>
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate course grader</p>&nbsp;@&nbsp;princeton
                                computer science department
                                <p style={{ marginLeft: "auto" }}>spring 2025</p>
                            </ExperienceHeader>
                            graded and critiqued rigorous, proof-based assignments and exams for COS445: Algorithmic
                            Game Theory.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate teaching assistant</p>
                                &nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>fall 2024</p>
                            </ExperienceHeader>
                            held office hours for COS324: Introduction to Machine Learning, assisting students with
                            course material and programming assignments during lab sessions. additionally, assisted in
                            grading assignments and providing feedback to students.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate teaching assistant</p>
                                &nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>spring 2024</p>
                            </ExperienceHeader>
                            held office hours for COS217: Introduction to Programming Systems, assisting students with
                            course material and programming assignments during lab sessions.
                            <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} />
                        </Experience>
                        {/*  */}
                        <Experience>
                            <ExperienceHeader>
                                <p style={{ fontWeight: 500 }}>undergraduate teaching assistant</p>
                                &nbsp;@&nbsp;princeton computer science department
                                <p style={{ marginLeft: "auto" }}>fall 2023</p>
                            </ExperienceHeader>
                            held office hours for COS226: Data Structures and Algorithms, assisting students with course
                            material and programming assignments during lab sessions.
                            {/* <hr style={{ border: "none", borderTop: "2px solid #eee", margin: "20px 0" }} /> */}
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

export default Teaching;
