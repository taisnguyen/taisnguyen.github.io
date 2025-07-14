import React, { useState } from "react";
import styled from "styled-components";
import styles from "./Layout.module.scss";

import Bubble from "../Bubble";
import Modal from "../Modal";

interface LayoutProps {
    children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <h5>
                            <a href="/#/">taisng</a>
                        </h5>
                    </div>
                    <div className={styles.nav}>
                        <a className="navContainerItem" id="0" href="/#/" draggable={false}>
                            <p
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 500
                                }}
                            >
                                /about_me
                            </p>
                        </a>
                        <a className="navContainerItem" id="1" href="/#/research" draggable={false}>
                            <p
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 500
                                }}
                            >
                                /research
                            </p>
                        </a>
                        <a className="navContainerItem" id="2" href="/#/work_experience" draggable={false}>
                            <p
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 500
                                }}
                            >
                                /work_experience
                            </p>
                        </a>
                        <a className="navContainerItem" id="3" href="/#/university_activities" draggable={false}>
                            <p
                                style={{
                                    fontFamily: "Satoshi-Variable",
                                    fontWeight: 500
                                }}
                            >
                                /university_activities
                            </p>
                        </a>
                    </div>
                    <div className={styles.contact}>
                        <Bubble
                            color="#4a4a4a"
                            onClick={() => window.open("https://www.linkedin.com/in/tai-sanh-nguyen", "_blank")}
                        >
                            contact me!
                        </Bubble>
                    </div>
                </div>
                <span className={styles.divider}></span>
                {children}
                <div className={styles.footer}>
                    © {new Date().getFullYear()} <span style={{ fontFamily: "Satoshi-Bold" }}>TAI SANH NGUYEN</span>
                </div>
            </div>
        </>
    );
};

const ContactTitle = styled.p`
    color: #4a4a4a;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
`;

const ContactHeader = styled.h5`
    color: #4a4a4a;
    font-family: "Satoshi-Black", sans-serif;
    font-weight: 500;
    padding-top: 0.2em;
`;

const ContactSubheader = styled.p`
    color: #4a4a4a;
    font-family: "Satoshi-Regular", sans-serif;
    padding-top: 1em;
`;

export default Layout;
