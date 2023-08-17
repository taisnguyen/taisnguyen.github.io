import React, { useEffect } from "react";
import styles from "./About.module.scss";

import { ReactComponent as MouseCursorIcon } from "../../assets/mouse-cursor-icon.svg";
import { ReactComponent as LaptopIcon } from "../../assets/laptop-icon.svg";

const About = () => {
    useEffect(() => {
        const handleOnMouseMove = (e: MouseEvent) => {
            const cursor = document.querySelector(".laptopInterfaceNavCursor") as HTMLElement;
            const leftRatio = e.clientX / window.innerWidth;
            const topRatio = e.clientY / window.innerHeight;
            cursor.style.left = `${leftRatio * 99.7}%`;
            cursor.style.top = `${topRatio * 100}%`;
        };

        const handleOnNavItemMouseOver = (e: MouseEvent) => {
            const navItemIndex = parseInt((e.target as HTMLElement).id);

            const laptopInterfaceNavItem = document.querySelectorAll(".laptopInterfaceNavItem")[
                navItemIndex
            ] as HTMLElement;
            laptopInterfaceNavItem.style.backgroundColor = "#80bff9";
        };

        const handleOnNavItemMouseOut = (e: MouseEvent) => {
            const navItemIndex = parseInt((e.target as HTMLElement).id);

            const laptopInterfaceNavItem = document.querySelectorAll(".laptopInterfaceNavItem")[
                navItemIndex
            ] as HTMLElement;
            laptopInterfaceNavItem.style.backgroundColor = "#c7ddb3";
        };

        // Add event listeners.
        document.addEventListener("mousemove", handleOnMouseMove);
        document
            .querySelectorAll(".navContainerItem")
            .forEach((item) => (item as HTMLElement).addEventListener("mouseover", handleOnNavItemMouseOver));
        document
            .querySelectorAll(".navContainerItem")
            .forEach((item) => (item as HTMLElement).addEventListener("mouseout", handleOnNavItemMouseOut));

        // Remove event listeners.
        return () => {
            document.removeEventListener("mousemove", handleOnMouseMove);
            document
                .querySelectorAll(".navContainerItem")
                .forEach((item) => (item as HTMLElement).removeEventListener("mouseover", handleOnNavItemMouseOver));
            document
                .querySelectorAll(".navContainerItem")
                .forEach((item) => (item as HTMLElement).removeEventListener("mouseout", handleOnNavItemMouseOut));
        };
    }, []);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.introductionContainer}>
                <p>
                    Hello, there!
                    <br />
                    I'm <b>Tai Sanh Nguyen</b>.
                </p>
                <div>
                    <div className={styles.laptopInterfaceContainer}>
                        <div className={`laptopInterfaceNavCursor ${styles.laptopInterfaceNavCursor}`}>
                            <MouseCursorIcon />
                        </div>
                        <div className={styles.laptopInterfaceNav}>
                            <div className="laptopInterfaceNavItem" style={{ width: "0.04em" }}></div>
                            <div className="laptopInterfaceNavItem" style={{ width: "0.075em" }}></div>
                            <div className="laptopInterfaceNavItem" style={{ width: "0.04em" }}></div>
                            <div className="laptopInterfaceNavItem" style={{ width: "0.03em" }}></div>
                            <div className="laptopInterfaceNavItem" style={{ width: "0.035em" }}></div>
                        </div>
                        <div className={styles.laptopInterfaceIntroduction}>
                            <div style={{ width: "0.101em", backgroundColor: "rgb(175, 208, 161)" }}></div>
                            <div style={{ width: "0.172em", backgroundColor: "rgb(183, 216, 183)" }}></div>
                            <div style={{ width: "0", height: "0.04em" }}></div>
                            <div style={{ width: "0.118em", backgroundColor: "rgb(191, 224, 205)" }}></div>
                            <div style={{ width: "0.268em", backgroundColor: "rgb(199, 232, 227)" }}></div>
                            <div style={{ width: "0.25em", backgroundColor: "rgb(207, 240, 249)" }}></div>
                            <div style={{ width: "0.22em", backgroundColor: "rgb(215, 248, 271)" }}></div>
                            <div style={{ width: "0", height: "0.04em" }}></div>
                        </div>
                    </div>
                    <LaptopIcon style={{ width: "1.02em", height: "1.02em", transform: "translate(1px, 8px)" }} />
                </div>
            </div>

            <div className={styles.descriptionContainer}>
                <div className={styles.descriptionHeader}>
                    <h1 style={{ fontWeight: "normal" }}>
                        A little bit <strong>about me</strong>.
                    </h1>
                    <span></span>
                </div>
                <p>
                    I am a <b>fullstack developer</b> who has had industry experience building scalable, performant web
                    applications. I am currently studying <b>engineering computer science</b> at Princeton University.
                </p>
            </div>
        </div>
    );
};

export default About;
