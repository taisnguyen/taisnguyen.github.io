import React, { useEffect } from "react";
import styles from "./TypingText.module.scss";

interface TypingTextProps {
    textOptions?: string[];
    color?: string;
}

const TypingText = ({ textOptions = [""], color = "#eb7b7b" }: TypingTextProps) => {
    useEffect(() => {
        let running = true;
        let textOptionIndex = Math.floor(Math.random() * textOptions.length);
        const animationLoop = () => {
            if (!running) return;

            const lastDelay = playTypingAnimation(textOptions[textOptionIndex], "typing-text");
            textOptionIndex = (textOptionIndex + 1) % textOptions.length;
            setTimeout(() => animationLoop(), lastDelay);
        };

        animationLoop();
        return () => {
            running = false;
        };
    }, []);

    return (
        <div className={styles.container}>
            {/* temporarily using id, limitation: does not work w multiple typingtext components */}
            <span className={styles.text} id="typing-text" style={{ color: color }}></span>
        </div>
    );
};

function playTypingAnimation(text: string, textContainerId: string): number {
    const container = document.querySelector(`#${textContainerId}`);
    if (!container) return 0;

    let lastDelay = 0;
    for (let i = 0; i < text.length; i++) {
        lastDelay = Math.random() * 180 + 100 + lastDelay;
        setTimeout(() => {
            container.innerHTML += text[i];
        }, lastDelay);
    }

    lastDelay += 6500 + Math.random() * 1800;
    for (let i = 0; i < text.length; i++) {
        lastDelay = Math.random() * 100 + 80 + lastDelay;
        setTimeout(() => {
            container.innerHTML = container.innerHTML.slice(0, container.innerHTML.length - 1);
        }, lastDelay);
    }

    return lastDelay;
}

export default TypingText;
