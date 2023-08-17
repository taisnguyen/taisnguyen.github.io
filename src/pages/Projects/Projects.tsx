import React, { useEffect } from "react";

import ProjectDisplay, { Project } from "./components/ProjectDisplay";
import styles from "./Projects.module.scss";

import { ReactComponent as JoyConBaseIcon } from "../../assets/joy-con-base-icon.svg";
import { ReactComponent as JoyConTopIcon } from "../../assets/joy-con-top-icon.svg";

const projects: Project[] = [
    {
        name: "Portfolio Website",
        description: "The code to this website! Built with React and TypeScript.",
        githubLink: "https://github.com/taisnguyen/word-fall-online"
    },
    {
        name: "Princeton University Site Builder",
        description:
            "A platform to build branded websites for Princeton University departments and organizations. I lead a subteam of developers and UI/UX researchers to create Princeton-branded components for the platform's website builder.",
        externalLink: "https://sitebuilder.princeton.edu/"
    },
    {
        name: "Word Fall Online",
        description:
            "An online, player-versus-player word game that is a work in progress! Built with NodeJS, Express, Socket.io, and React.",
        githubLink: "https://github.com/taisnguyen/word-fall-online"
    }
];

const Projects = () => {
    useEffect(() => {
        const joyConTopIcon = document.querySelector(".joyConTopIcon") as HTMLElement;
        const joyConBaseIcon = document.querySelector(".joyConBaseIcon") as HTMLElement;
        joyConTopIcon.style.transform = "translate(1px, -0.44em)";

        const handleOnMouseMove = (e: MouseEvent) => {
            const horizontalRatio = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const yOffset = (Math.sin(Math.acos(horizontalRatio) + Math.PI) + 1) * 0.3;

            // Animate joy stick.
            joyConTopIcon.animate(
                [
                    {
                        transform: `translate(${horizontalRatio * 0.3}em, ${-0.44 + yOffset}em) rotate(${
                            -(Math.acos(horizontalRatio) - Math.PI / 2) * 40
                        }deg)`
                    }
                ],
                {
                    fill: "forwards",
                    duration: 200
                }
            );

            // Animate joy base.
            joyConBaseIcon.animate(
                [
                    {
                        transform: `translateY(4px) rotate(${horizontalRatio * 40}deg)`
                    }
                ],
                {
                    fill: "forwards",
                    duration: 4800
                }
            );
        };

        // Add event listeners.
        document.addEventListener("mousemove", handleOnMouseMove);

        // Remove event listeners.
        return () => document.removeEventListener("mousemove", handleOnMouseMove);
    });

    return (
        <div className={styles.mainContainer}>
            <div className={styles.introductionContainer}>
                <p>
                    My <b>projects</b>.
                </p>
                <div>
                    <JoyConBaseIcon
                        className="joyConBaseIcon"
                        style={{ width: "1.02em", height: "1.02em", transform: "translate(1px, 8px)" }}
                    />
                    <JoyConTopIcon
                        className="joyConTopIcon"
                        style={{ width: "0.4em", height: "1.02em", transform: "translate(1px, 8px)" }}
                    />
                </div>
            </div>

            <div className={styles.projectDisplayContainer}>
                {projects.map((project: Project, i) => (
                    <ProjectDisplay key={i} project={project} stripeColor={[191 + i * 8, 224 + i * 8, 205 + i * 22]} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
