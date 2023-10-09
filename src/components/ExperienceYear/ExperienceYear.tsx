import React from "react";
import styles from "./ExperienceYear.module.scss";

export interface Experience {
    name: string;
    company: string;
    period: string;
    description: string;
}

export interface ExperienceTimeline {
    [year: string]: Experience[];
}

interface ExperienceYearProps {
    year: string;
    experiences: Experience[];
    stripeColor: [number, number, number]; // [R,G,B]
}

const ExperienceYear = ({ year, experiences, stripeColor }: ExperienceYearProps) => {
    return (
        <div>
            <div className={styles.yearWrapper}>
                <h1>{year}</h1>
                <span
                    style={{
                        backgroundColor: `rgb(${stripeColor[0]},${stripeColor[1]},${stripeColor[2]})`
                    }}
                />
            </div>
            {experiences.map(({ name, company, period, description }: Experience) => (
                <>
                    <div className={styles.experienceWrapper}>
                        <section className={styles.experienceHeader}>
                            <b>{name}</b>&nbsp;@&nbsp;<i>{company}</i>
                            <b style={{ marginLeft: "auto" }}>{period}</b>
                        </section>
                        {description}
                    </div>
                </>
            ))}
        </div>
    );
};

export default ExperienceYear;
