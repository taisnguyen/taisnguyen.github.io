import { useEffect, useState } from "react";
import styles from "./AsciiGizmo.module.scss";

import {
    AsciiAnimationManager,
    NumberAsciiAnimation,
    SinAsciiAnimation,
    GravityAsciiAnimation,
    TextScrollAsciiAnimation,
    SandAsciiAnimation,
    SwimFishAsciiAnimation
} from "./animations";
import { AsciiAnimation } from "./animations";

const ASCII_ANIMATIONS_1: AsciiAnimation[] = [
    NumberAsciiAnimation,
    GravityAsciiAnimation,
    TextScrollAsciiAnimation,
    SandAsciiAnimation
];
ASCII_ANIMATIONS_1.sort(() => Math.random() - 0.5);
ASCII_ANIMATIONS_1.unshift(SinAsciiAnimation);

const ASCII_ANIMATIONS_2: AsciiAnimation[] = [SwimFishAsciiAnimation];

interface AsciiGizmoProps {
    id: string;
    asciiAnimationsPreset: 1 | 2;
}

const AsciiGizmo = ({ id, asciiAnimationsPreset }: AsciiGizmoProps) => {
    const [asciiAnimationManager, setAsciiAnimationManager] = useState<AsciiAnimationManager | null>(null);

    useEffect(() => {
        if (!asciiAnimationManager) return;
        asciiAnimationManager.start();
        return () => {
            asciiAnimationManager.stop();
        };
    }, [asciiAnimationManager]);

    useEffect(() => {
        const AsciiGizmoDOM = document.getElementById(id);
        if (!AsciiGizmoDOM) return;
        const manager = new AsciiAnimationManager(
            AsciiGizmoDOM,
            asciiAnimationsPreset === 1 ? ASCII_ANIMATIONS_1 : ASCII_ANIMATIONS_2
        );
        setAsciiAnimationManager(manager);

        const handleResize = () => {
            manager.updateRowCols();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [id]);

    return (
        <div className={styles.container}>
            {/* <div>pause</div> */}
            <div className={styles.asciiGizmo} id={id}></div>
        </div>
    );
};

export default AsciiGizmo;
