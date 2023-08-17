import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { BsZoomIn, BsZoomOut } from "react-icons/bs";
import styles from "./Resume.module.scss";

import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Resume = () => {
    const [zoom, setZoom] = useState<number>(1);

    return (
        <div className={styles.mainContainer}>
            <Document file="resume.pdf">
                <Page pageNumber={1} height={1080} renderTextLayer={false} renderAnnotationLayer={false} scale={zoom} />
            </Document>
            <div className={styles.zoomButtonContainer}>
                {zoom < 2 && (
                    <BsZoomIn
                        onClick={() => {
                            // The Math.round is to handle awkward floating point errors.
                            setZoom((zoom: number) => Math.min(2, Math.round((zoom + 0.2) * 10) / 10));
                        }}
                    />
                )}
                {zoom >= 2 && <div style={{ width: "24px", height: "24px" }} />}
                {zoom > 0.6 && (
                    <BsZoomOut
                        onClick={() => {
                            setZoom((zoom: number) => Math.max(0.6, Math.round((zoom - 0.2) * 10) / 10));
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Resume;
