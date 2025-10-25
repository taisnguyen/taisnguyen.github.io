import React from "react";
import styled from "styled-components";

interface BubbleProps {
    color?: string; // hex or color name
    fill?: string; // true for gradient, string for color
    underlay?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Bubble = ({ color = "#000", fill, underlay, onClick, children }: BubbleProps) => {
    return (
        <BubbleWrapper
            $underlay={underlay}
            onClick={onClick}
            style={{
                border: `2px solid ${color}`,
                backgroundColor: fill,
                cursor: onClick ? "pointer" : "default"
            }}
        >
            {children}
        </BubbleWrapper>
    );
};

const BubbleWrapper = styled.div<{ $underlay?: string }>`
    user-select: none;
    display: flex;
    flex-direction: column;
    border: 1.6px solid #f6e5e5;
    border-radius: 2rem;
    padding: 2px;
    padding-left: 8px;
    padding-right: 8px;
    font-family: "Satoshi-Variable", sans-serif;
    white-space: nowrap;
    font-weight: 500;

    & > * {
        white-space: nowrap;
        overflow: hidden;
    }

    &:hover {
        background-color: ${(props) => props.$underlay};
    }
`;

export default Bubble;
