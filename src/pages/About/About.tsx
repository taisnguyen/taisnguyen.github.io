import React, { useEffect } from "react";
import styles from "./About.module.scss";

import { ReactComponent as JoyConBaseIcon } from "../../assets/joy-con-base-icon.svg";
import { ReactComponent as JoyConTopIcon } from "../../assets/joy-con-top-icon.svg";
import { ReactComponent as GithubIcon } from "../../assets/github-icon.svg";

import Bubble from "../../components/Bubble";
import TypingText from "../../components/TypingText";

const TypingTextOptions = [
    "swe",
    "pton",
    "work",
    "dining hall",
    "msft",
    "friend center",
    "seattle",
    "dorm",
    "hack4impact"
];

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.introduction}>
                <h1>
                    tai sanh nguyen @ <br />
                    <TypingText textOptions={TypingTextOptions} color="#eb7b7b" />
                </h1>
                <div className={styles.links}>
                    <Bubble color="#f0cb81" fill="#f0cb81">
                        <p>programmer</p>
                    </Bubble>
                    <Bubble color="#de807e" fill="#de807e">
                        <p>student</p>
                    </Bubble>
                    <Bubble color="#89cfa9" fill="#89cfa9">
                        <p>math enthusiast</p>
                    </Bubble>
                    <Bubble color="#81a6f0" fill="#81a6f0">
                        <p>engineer</p>
                    </Bubble>
                </div>
                <div className={styles.description}>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 600 }}>(about me) </span>im a software engineer with industry
                            experience building scalable, performant web applications. im also currently studying
                            computer science at princeton university with a minor in applied mathematics.
                        </p>
                        <p>
                            <span style={{ fontWeight: 600 }}>(my experiences) </span> a lot of my work experience is in
                            fullstack development. ive worked at broward county public schools, fusion systems, the
                            daily princetonian, hack4impact, and am interning with microsoft this summer.
                        </p>
                    </div>
                    <div className={styles.innerDescription}>
                        <p>
                            <span style={{ fontWeight: 600 }}>(my activities) </span>outside of industry, i enjoy
                            developing for a smaller community on campus. i am the lead software engineer for the daily
                            princetonian, a developer for hack4impact, a participant of spaceport america cup, and a
                            member of princeton's acm chapter.
                        </p>
                        <p>
                            <span style={{ fontWeight: 600 }}>(my interests) </span>other interests of mine include pure
                            math, theoretical computer science, and anything space. oh, and i also enjoy video games!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
