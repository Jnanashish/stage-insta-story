import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { getStoryData } from "../../helper";

interface Story {
    id: number;
    image: string;
}

interface User {
    id: string;
    avatar: string;
    story: Story[];
}

interface DataItem {
    user: User;
}



const Story: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
    const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

    const fetchStoryData = async () => {
        const data: DataItem[] = await getStoryData();
        setData(data);
    };

    // move to the next story
    const nextStory = () => {
        const userStories = data[selectedUserIndex!]?.user?.story;

        setCurrentStoryIndex((prevIndex) => {
            if (prevIndex !== null && userStories && prevIndex + 1 < userStories.length) {
                return prevIndex + 1;
            } else {
                setSelectedUserIndex((userIndex) => {
                    const nextUserIndex = (userIndex! + 1) % data.length;
                    setCurrentStoryIndex(0);
                    return nextUserIndex;
                });

                return 0;
            }
        });
    };

    // move to the previous story
    const prevStory = () => {
        setCurrentStoryIndex((prevIndex) => {
            const userStories = data[selectedUserIndex!]?.user?.story;
            if (prevIndex !== null && prevIndex > 0) {
                return prevIndex - 1;
            } else {
                setSelectedUserIndex((userIndex) => {
                    let previousUserIndex: number;
                    if (userIndex === 0) {
                        previousUserIndex = userStories.length - 1;
                    } else {
                        previousUserIndex = userIndex! - 1;
                    }
                    setCurrentStoryIndex(0);
                    return previousUserIndex;
                });
                return 0;
            }
        });
    };

    // when the user clicks on the story
    const handleStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const storyElement = e.currentTarget;
        if (!storyElement) return;
        const clickPosition = e.clientX - storyElement.getBoundingClientRect().left;
        const storyWidth = storyElement.offsetWidth;

        if (clickPosition < storyWidth / 2) {
            nextStory();
        } else {
            prevStory();
        }
    };

    // when a user icon is clicked, set the selected user index and reset the story index
    const handleUserIconClick = (index: number) => {
        setSelectedUserIndex(index);
        setCurrentStoryIndex(0);
    };

    // when the close button is clicked
    const closeStory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setSelectedUserIndex(null);
        setCurrentStoryIndex(null);
    };

    useEffect(() => {
        if (selectedUserIndex !== null && currentStoryIndex !== null) {            
            const interval = setInterval(() => {
                nextStory();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [selectedUserIndex, currentStoryIndex]);

    useEffect(() => {
        fetchStoryData();
    }, []);

    return (
        <div>
            <div className={`${styles.storyItem} ${selectedUserIndex !== null ? styles.hidden : ""}`}>
                {data.map((item, index) => (
                    <div
                        key={item.user.id}
                        onClick={() => {
                            handleUserIconClick(index);
                        }}
                    >
                        <img src={item.user.avatar} alt="user icon" />
                    </div>
                ))}
            </div>

            {selectedUserIndex !== null && data[selectedUserIndex]?.user?.story[currentStoryIndex!] && (
                <div className={styles.story} onClick={handleStoryClick}>
                    {/* user icon */}
                    <div className={styles.userIcon}>
                        <img src={data[selectedUserIndex].user.avatar} alt="avatar" />
                    </div>

                    {/* close button */}
                    <button className={styles.closeButton} onClick={(e) => closeStory(e)}>
                        X
                    </button>

                    {/* progress bar */}
                    <div className={styles.progressBarContainer}>
                        {data[selectedUserIndex]?.user?.story.map((item, index) => (
                            <div key={item.id} className={styles.progressBar}>
                                <div
                                    className={`${styles.progressBarFill} ${index === currentStoryIndex ? styles.progressBarAnimation : ""}`}
                                    style={{
                                        width: index === currentStoryIndex ? "100%" : "0%",
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <img src={data[selectedUserIndex].user.story[currentStoryIndex!].image} alt="story" />
                </div>
            )}
        </div>
    );
}

export default Story;
