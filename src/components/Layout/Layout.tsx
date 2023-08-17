import React from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
    children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.mainContainer}>
            <nav className={styles.navContainer}>
                {/* Id here is used as index. */}
                <a className="navContainerItem" id="0" href="/" draggable={false}>
                    about me
                </a>
                <a className="navContainerItem" id="1" href="/#/work" draggable={false}>
                    work experience
                </a>
                <a className="navContainerItem" id="2" href="/#/projects" draggable={false}>
                    projects
                </a>
                <a className="navContainerItem" id="3" href="/#/resume" draggable={false}>
                    resume
                </a>
                <a className="navContainerItem" id="4" href="/#/contact" draggable={false}>
                    contact
                </a>
            </nav>
            {children}
        </div>
    );
};

export default Layout;
