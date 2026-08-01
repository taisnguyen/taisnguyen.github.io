import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import styles from "./Layout.module.scss";

import Bubble from "../Bubble";
import Modal from "../Modal";
import AsciiGizmo from "../../gizmos/ascii/AsciiGizmo";

export const GLOBAL_PAUSE_ASCII_ANIMATIONS = { value: false };

// window.onload = () => {
//     (document.getElementsByClassName(styles.container)[0] as HTMLElement).style.opacity = "1";
//     // setTimeout(() => {
//     // }, 100);
// };

interface LayoutProps {
    children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
    const [asciiAnimationPaused, setAsciiAnimationPaused] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // read url to get correct initial page
    const getPageFromHash = (hash: string) => {
        const path = hash ? hash.replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "") : "";
        if (!path) return "home";
        if (path.startsWith("work_experience")) return "work";
        if (path.startsWith("research")) return "research";
        if (path.startsWith("teaching")) return "teaching";
        if (path.startsWith("university_activities")) return "university";
        if (path.startsWith("photos")) return "photos";
        return "home";
    };

    const [currentPage, setCurrentPage] = useState<string>(() =>
        getPageFromHash(typeof window !== "undefined" ? window.location.hash : "")
    );

    useEffect(() => {
        if (containerRef.current) {
            const timeout = setTimeout(() => {
                if (containerRef.current) containerRef.current.style.opacity = "1";
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.header}>
                <div className={styles.nav}>
                    <a
                        className="navContainerItem"
                        id="0"
                        onClick={() => setCurrentPage("home")}
                        href="/#/home"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "home" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            home
                        </p>
                    </a>
                    <a
                        className="navContainerItem"
                        id="1"
                        onClick={() => setCurrentPage("work")}
                        href="/#/work_experience"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "work" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            work experience
                        </p>
                    </a>
                    <a
                        className="navContainerItem"
                        id="2"
                        onClick={() => setCurrentPage("research")}
                        href="/#/research"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "research" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            research
                        </p>
                    </a>
                    <a
                        className="navContainerItem"
                        id="3"
                        onClick={() => setCurrentPage("teaching")}
                        href="/#/teaching"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "teaching" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            teaching
                        </p>
                    </a>
                    <a
                        className="navContainerItem"
                        id="4"
                        onClick={() => setCurrentPage("university")}
                        href="/#/university_activities"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "university" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            university activities
                        </p>
                    </a>
                    <a
                        className="navContainerItem"
                        id="4"
                        onClick={() => setCurrentPage("photos")}
                        href="/#/photos"
                        draggable={false}
                    >
                        <p
                            style={{
                                fontWeight: 400,
                                color: "#4a4a4a",
                                borderBottom: currentPage === "photos" ? "2px dotted #4a4a4a" : "none"
                            }}
                        >
                            photos
                        </p>
                    </a>
                </div>
                {/* <div className={styles.contact}>
                        <Bubble
                            color="#4a4a4a"
                            onClick={() => window.open("https://www.linkedin.com/in/tai-sanh-nguyen", "_blank")}
                        >
                            contact me!
                        </Bubble>
                    </div> */}
            </div>
            <div className={styles.leftSideContainer}>
                <AsciiGizmo id="left-ascii-gizmo" asciiAnimationsPreset={1} />
            </div>
            {children}
            <div className={styles.footer}>
                <div>
                    {/* © {new Date().getFullYear()} <span style={{ fontFamily: "Satoshi-Bold" }}>TAI SANH NGUYEN</span> */}
                </div>
                <button
                    className={styles.pause}
                    onClick={() => {
                        GLOBAL_PAUSE_ASCII_ANIMATIONS.value = !GLOBAL_PAUSE_ASCII_ANIMATIONS.value;
                        setAsciiAnimationPaused(GLOBAL_PAUSE_ASCII_ANIMATIONS.value);
                    }}
                    style={{
                        marginLeft: "auto",
                        marginRight: "0.8em",
                        border: "none",
                        cursor: "pointer",
                        background: "#fff"
                    }}
                >
                    {/* <p style={{ fontSize: "14px", fontFamily: "Roboto", color: "#4a4a4a", fontWeight: 400 }}>
                        {asciiAnimationPaused ? "resume animations" : "pause animations"}
                    </p> */}
                </button>
            </div>
        </div>
    );
};

export default Layout;
