import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

interface ProgressbarProps {
    currentStoryIndex: number;
    storyData: any[];
    selectedUserIndex: number;
}

function Progressbar({ currentStoryIndex, storyData, selectedUserIndex }: ProgressbarProps) {
    const [storyIndex, setStoryIndex] = useState<number | null>(null);
    useEffect(() => {
        setTimeout(() => {
            setStoryIndex(currentStoryIndex);
        }, 100);
    }, [currentStoryIndex, selectedUserIndex]);

    return (
        <div className={styles.progressBarContainer}>
            {storyData.map((item: any, index: number) => (
                <div className={styles.progressBar}>
                    <div
                        id={`progress${index}`}
                        key={`progress${index}${currentStoryIndex}${selectedUserIndex}`}
                        className={`${styles.progressBarFill}`}
                        style={{ width: index <= (storyIndex ?? -1) ? "100%" : "0%", transition: index === storyIndex ? "width 5s linear" : "" }}
                    ></div>
                </div>
            ))}
        </div>
    );
}

export default Progressbar;