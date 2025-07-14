import React from "react";
import styled from "styled-components";

import Bubble from "../Bubble";

export interface Experience {
    name: string;
    company: string;
    period: string;
    description: string | React.ReactNode;
}

export interface ExperienceTimeline {
    [year: string]: Experience[];
}

// TODO: This is old code, so its style is not completely consistent with the rest of the website.
// Fix this another time.
interface ExperienceYearProps {
    year: string;
    experiences: Experience[];
    stripeColor: [number, number, number]; // [R,G,B]
}

const ExperienceYear = ({ year, experiences, stripeColor }: ExperienceYearProps) => {
    return (
        <ExperienceYearWrapper>
            <Year>
                <Bubble
                    color={`rgb(${stripeColor[0]},${stripeColor[1]},${stripeColor[2]})`}
                    fill={`rgb(${stripeColor[0]},${stripeColor[1]},${stripeColor[2]})`}
                >
                    {year}
                </Bubble>
            </Year>
            {experiences.map(({ name, company, period, description }: Experience) => (
                <>
                    <Experience>
                        <ExperienceHeader>
                            <b>{name}</b>&nbsp;@&nbsp;<i>{company}</i>
                            <b style={{ marginLeft: "auto" }}>{period}</b>
                        </ExperienceHeader>
                        {description}
                    </Experience>
                </>
            ))}
        </ExperienceYearWrapper>
    );
};

const ExperienceYearWrapper = styled.div`
    margin-bottom: 1.4rem;
`;

const Year = styled.div`
    display: flex;
    margin-bottom: 1rem;
    gap: 0.5rem;
`;

const Experience = styled.div`
    margin-bottom: 1rem;
    & > p {
        font-family: "Roboto", sans-serif;
        color: #5f5f5f;
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    margin-bottom: 0.2em;
`;

export default ExperienceYear;
