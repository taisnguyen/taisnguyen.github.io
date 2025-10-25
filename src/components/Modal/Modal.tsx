import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

const Modal = ({ open = false, onClose, children }: ModalProps) => {
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose && onClose();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <>
            {open && (
                <Dimmer>
                    <ModalWrapper>
                        <ExitButton onClick={onClose} />
                        <ModalContent>{children}</ModalContent>
                    </ModalWrapper>
                </Dimmer>
            )}
        </>
    );
};

const Dimmer = styled.div`
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
`;

const ModalWrapper = styled.div`
    position: relative;
    width: 400px;
    padding-bottom: 1em;
    background-color: #ffffff;
    border-radius: 8px;
`;

const ModalContent = styled.div`
    width: calc(100% - 2em);
    height: calc(100% - 2em);
    margin: 1em;
`;

const ExitButton = styled.div`
    width: 12px;
    height: 12px;
    background-color: #ffffff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    position: absolute;
    top: -12px;
    right: -12px;
    padding: 6px;

    &:hover {
        cursor: pointer;
        background-color: #f4f4f4;
    }

    &:after {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        width: 12px;
        height: 2px;
        background-color: #2a2a2a;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &:before {
        position: absolute;
        content: "";
        top: 50%;
        left: 50%;
        width: 12px;
        height: 2px;
        background-color: #2a2a2a;
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;

export default Modal;
