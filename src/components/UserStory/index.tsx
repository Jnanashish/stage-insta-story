import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import Progressbar from "../Progressbar";

interface UserStoryProps {
    handleStoryClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    data: any[];
    selectedUserIndex: number;
    currentStoryIndex: number;
    closeStory: (e: React.MouseEvent<HTMLButtonElement>) => void;
    toggle: boolean;
}

const UserStory = ({ handleStoryClick, data, selectedUserIndex, currentStoryIndex, closeStory, toggle }: UserStoryProps) => {
    return (
        <div id={`story-${data[selectedUserIndex].user.id}`} className={styles.storyContainer} onClick={handleStoryClick}>
            {/* user icon */}
            <div className={styles.storyHeader}>
                <div className={styles.selecteduser}>
                    <div className={styles.selecteduserIcon}>
                        <img src={data[selectedUserIndex].user.avatar} alt="avatar" />
                    </div>
                    <span className={styles.selecteduserName}>{data[selectedUserIndex].user?.name}</span>
                </div>

                <button className={styles.closeButton} onClick={(e) => closeStory(e)}>
                    &#x2715;
                </button>
            </div>

            {/* progress bar */}
            <Progressbar key={`${selectedUserIndex} ${toggle}`} data={data} selectedUserIndex={selectedUserIndex} currentStoryIndex={currentStoryIndex} />

            <img src={data[selectedUserIndex].user.story[currentStoryIndex!].image} alt="story" />
        </div>
    );
};

export default UserStory;
