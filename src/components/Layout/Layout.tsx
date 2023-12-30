import React, { useState } from "react";
import styled from "styled-components";
import styles from "./Layout.module.scss";

import Bubble from "../Bubble";
import Modal from "../Modal";

interface LayoutProps {
    children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
                            <p>/about_me</p>
                        </a>
                        <a className="navContainerItem" id="1" href="/#/work_experience" draggable={false}>
                            <p>/work_experience</p>
                        </a>
                        <a className="navContainerItem" id="1" href="/#/university_activities" draggable={false}>
                            <p>/university_activities</p>
                        </a>
                    </div>
                    <div className={styles.contact}>
                        <Bubble color="#4a4a4a" onClick={() => setIsContactModalOpen(true)}>
                            contact me!
                        </Bubble>
                    </div>
                </div>
                <span className={styles.divider}></span>
                {children}
                <div className={styles.footer}>
                    © 2023 <span style={{ fontFamily: "Satoshi-Bold" }}>TAI SANH NGUYEN</span>
                </div>
            </div>

            {/* Contact Modal. */}
            <Modal open={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
                {/* <ContactTitle>Contact Form</ContactTitle> */}
                <ContactHeader>Hey! I'm glad you're reaching out. Let's connect.</ContactHeader>
                <ContactSubheader>
                    You can find me on{" "}
                    <a
                        href="https://www.linkedin.com/in/tai-sanh-nguyen/"
                        target="_blank"
                        style={{ color: "#0077b5", textDecoration: "underline" }}
                    >
                        LinkedIn
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://github.com/taisnguyen"
                        target="_blank"
                        style={{ color: "#bd2c00", textDecoration: "underline" }}
                    >
                        GitHub
                    </a>
                    , or you could{" "}
                    <a href="mailto:tai.sanh.ng@gmail.com" style={{ color: "#f2a60c", textDecoration: "underline" }}>
                        shoot me an email
                    </a>
                    !
                </ContactSubheader>
            </Modal>
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
