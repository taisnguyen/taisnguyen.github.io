import React from "react";
import styles from "./ProjectDisplay.module.scss";

import { ReactComponent as GithubIcon } from "../../../../assets/github-icon.svg";
import { ReactComponent as RedirectIcon } from "../../../../assets/redirect-icon.svg";

export interface Project {
    name: string;
    description: string;
    githubLink?: string;
    externalLink?: string;
}

interface ProjectDisplayProps {
    project: Project;
    stripeColor: [number, number, number]; // [R,G,B]
}

const ProjectDisplay = ({ project, stripeColor }: ProjectDisplayProps) => {
    const { name, description, githubLink, externalLink } = project;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{name}</h1>
                <span
                    style={{
                        backgroundColor: `rgb(${stripeColor[0]},${stripeColor[1]},${stripeColor[2]})`
                    }}
                />
            </div>
            {description}
            <div className={styles.linkLogoContainer}>
                {githubLink && (
                    <GithubIcon className={styles.linkLogo} onClick={() => window.open(githubLink, "_blank")} />
                )}
                {externalLink && (
                    <RedirectIcon className={styles.linkLogo} onClick={() => window.open(externalLink, "_blank")} />
                )}
            </div>
        </div>
    );
};

export default ProjectDisplay;
