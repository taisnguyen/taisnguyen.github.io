import React, { useEffect } from "react";
import styles from "./Contact.module.scss";

import { ReactComponent as MailIcon } from "../../assets/mail-icon.svg";

const Contact = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.introductionContainer}>
                <p>
                    Where you can <b>reach me</b>.
                </p>
                <div>
                    <MailIcon style={{ width: "1.02em", height: "1.02em" }} />
                </div>
            </div>

            <div className={styles.contactContainer}>
                Thanks for checking me out! You can reach me on{" "}
                <a href="https://www.linkedin.com/in/tai-sanh-nguyen/" target="_blank">
                    LinkedIn
                </a>{" "}
                or{" "}
                <a href="https://github.com/taisnguyen" target="_blank">
                    GitHub
                </a>
            </div>
        </div>
    );
};

export default Contact;
