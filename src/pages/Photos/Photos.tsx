import { useEffect, useRef, useState } from "react";
import styles from "./Photos.module.scss";

const MasonryPhoto = ({ photo, onClick }: { photo: any; onClick: () => void }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={styles.masonryItem} onClick={onClick}>
            <div className={styles.imageWrapper} style={{ aspectRatio: photo.aspectRatio }}>
                {!isLoaded && <div className={styles.skeleton} />}
                <img
                    src={photo.src}
                    alt={photo.caption || `gallery image ${photo.id}`}
                    onLoad={() => setIsLoaded(true)}
                    className={isLoaded ? styles.loaded : styles.loading}
                />
            </div>

            {/* <p>{photo.caption && <div className={styles.caption}>{photo.caption}</div>}</p> */}
        </div>
    );
};

const Photos = () => {
    const contentBoundsRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [showFooter, setShowFooter] = useState(false);
    const [footerBounds, setFooterBounds] = useState({
        left: 0,
        width: 0
    });

    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    useEffect(() => {
        const contentBounds = contentBoundsRef.current;
        const scrollContainer = scrollContainerRef.current;

        if (!contentBounds || !scrollContainer) return;

        let isActive = true;
        let firstAnimationFrame = 0;
        let secondAnimationFrame = 0;

        const updateFooter = () => {
            const rect = contentBounds.getBoundingClientRect();
            const nextBounds = {
                left: rect.left,
                width: rect.width
            };

            setFooterBounds((currentBounds) => {
                if (currentBounds.left === nextBounds.left && currentBounds.width === nextBounds.width) {
                    return currentBounds;
                }

                return nextBounds;
            });

            const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight + 1;
            const shouldShowFooter = isScrollable && scrollContainer.scrollTop <= 1;

            setShowFooter((currentValue) => (currentValue === shouldShowFooter ? currentValue : shouldShowFooter));
        };

        const resizeObserver = new ResizeObserver(updateFooter);

        resizeObserver.observe(contentBounds);
        resizeObserver.observe(scrollContainer);

        if (contentBounds.parentElement) {
            resizeObserver.observe(contentBounds.parentElement);
        }

        Array.from(scrollContainer.children).forEach((child) => {
            resizeObserver.observe(child as Element);
        });

        scrollContainer.addEventListener("scroll", updateFooter);
        window.addEventListener("resize", updateFooter);

        firstAnimationFrame = requestAnimationFrame(() => {
            secondAnimationFrame = requestAnimationFrame(updateFooter);
        });

        void document.fonts?.ready.then(() => {
            if (isActive) updateFooter();
        });

        return () => {
            isActive = false;

            cancelAnimationFrame(firstAnimationFrame);
            cancelAnimationFrame(secondAnimationFrame);

            scrollContainer.removeEventListener("scroll", updateFooter);
            window.removeEventListener("resize", updateFooter);
            resizeObserver.disconnect();
        };
    }, []);

    const photoData = [
        {
            id: 1,
            src: "https://i.imgur.com/L8qAtNz.jpeg",
            aspectRatio: "4160/6240"
            // caption: "tsim sha tsui, hong kong, 2025"
        },
        {
            id: 2,
            src: "https://i.imgur.com/HBqYXJO.jpeg",
            aspectRatio: "6240/4160"
            // caption: "princeton, nj, 2026"
        },
        {
            id: 3,
            src: "https://i.imgur.com/GthCMqG.jpeg",
            aspectRatio: "6240/4160"
            // caption: "seattle, wa, 2024"
        }
        // {
        //     id: 4,
        //     src: "https://i.imgur.com/dIVeUvE.jpeg",
        //     aspectRatio: "6240/4160"
        //     // caption: "seattle, wa, 2024"
        // },
        // {
        //     id: 5,
        //     src: "https://i.imgur.com/7a4cWga.jpeg",
        //     aspectRatio: "5981/4116"
        //     // caption: "tsim sha tsui, hong kong, 2025"
        // }
        // { id: 7, src: "https://i.imgur.com/XmJCoSH.jpeg", aspectRatio: "4160/6240", caption: "saigon, vietnam, 2025" }
    ];

    return (
        <>
            <div className={styles.container}>
                <div ref={contentBoundsRef} className={styles.introduction}>
                    <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                    <p style={{ marginBottom: "2em" }}>my favorite photos, each captured with the fujifilm x100v</p>

                    <div ref={scrollContainerRef} className={styles.scrollContainer}>
                        <div className={styles.masonryGrid}>
                            {photoData.map((photo) => (
                                <MasonryPhoto
                                    key={photo.id}
                                    photo={photo}
                                    onClick={() => setSelectedPhoto(photo.src)}
                                />
                            ))}
                        </div>
                        <div style={{ marginBottom: "4rem" }} />
                    </div>
                </div>
            </div>

            <div
                className={`${styles.scrollFooter} ${showFooter ? styles.footerVisible : ""}`}
                style={{
                    left: footerBounds.left,
                    width: footerBounds.width
                }}
            >
                <p>scroll for more</p>
            </div>

            {selectedPhoto && (
                <div className={styles.lightbox} onClick={() => setSelectedPhoto(null)}>
                    <img src={selectedPhoto} alt="enlarged view" className={styles.lightboxImg} />
                </div>
            )}
        </>
    );
};

export default Photos;
