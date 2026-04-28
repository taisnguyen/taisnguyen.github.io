import { useEffect, useState } from "react";
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

            <p>{photo.caption && <div className={styles.caption}>{photo.caption}</div>}</p>
        </div>
    );
};

const Photos = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    useEffect(() => {
        const scrollContainer = document.getElementsByClassName(styles.scrollContainer)[0] as HTMLDivElement;
        const scrollFooter = document.getElementsByClassName(styles.scrollFooter)[0] as HTMLDivElement;

        if (!scrollContainer || !scrollFooter) return;
        const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight;
        if (!isScrollable) {
            scrollFooter.style.display = "none";
            return;
        }

        const handleScroll = () => {
            const atTop = scrollContainer.scrollTop === 0;
            scrollFooter.style.opacity = atTop ? "1" : "0";
        };

        handleScroll();
        scrollContainer.addEventListener("scroll", handleScroll);

        return () => {
            scrollContainer.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const photoData = [
        {
            id: 1,
            src: "https://i.imgur.com/L8qAtNz.jpeg",
            aspectRatio: "4160/6240",
            caption: "tsim sha tsui, hong kong, 2025 // navigating the midday heat through the dense city grid."
        },
        {
            id: 2,
            src: "https://i.imgur.com/HBqYXJO.jpeg",
            aspectRatio: "6240/4160",
            caption: "princeton, nj, 2026 // our precious man man."
        },
        {
            id: 3,
            src: "https://i.imgur.com/GthCMqG.jpeg",
            aspectRatio: "6240/4160",
            caption: "seattle, wa, 2024 // quiet transit on the way back into the city."
        },
        {
            id: 4,
            src: "https://i.imgur.com/dIVeUvE.jpeg",
            aspectRatio: "6240/4160",
            caption: "seattle, wa, 2024 // slow afternoons downtown."
        },
        {
            id: 5,
            src: "https://i.imgur.com/7a4cWga.jpeg",
            aspectRatio: "5981/4116",
            caption: "tsim sha tsui, hong kong, 2025"
        },
        { id: 7, src: "https://i.imgur.com/GycxWD6.jpeg", aspectRatio: "4160/6240", caption: "saigon, vietnam, 2025" }
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <h3 style={{ fontFamily: "Roboto", fontWeight: 400 }}>tai sanh nguyen</h3>
                    <p style={{ marginBottom: "2em" }}>my favorite photos, each captured with the fujifilm x100v</p>

                    <div className={styles.scrollContainer}>
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

            <div className={styles.scrollFooter}>
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
