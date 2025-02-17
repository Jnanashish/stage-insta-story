import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

interface ProgressbarProps {
    data: any[];
    selectedUserIndex: number;
    currentStoryIndex: number;
}

function Progressbar({ data, selectedUserIndex, currentStoryIndex }: ProgressbarProps) {
    const [storyIndex, setStoryIndex] = useState<number | null>(null);
    useEffect(() => {
        setStoryIndex(currentStoryIndex);
    }, [currentStoryIndex]);

    return (
        <div className={styles.progressBarContainer}>
            {data[selectedUserIndex]?.user?.story.map((item: any, index: number) => (
                <div className={styles.progressBar}>
                    <div
                        id={`progress${index}`}
                        className={`${styles.progressBarFill}`}
                        style={{ width: index <= (storyIndex ?? -1) ? "100%" : "0%", transition: index === storyIndex ? "width 5s linear" : "" }}
                    ></div>
                </div>
            ))}
        </div>
    );
}

export default Progressbar;