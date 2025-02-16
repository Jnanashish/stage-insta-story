import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import instagramLogo from "../../assets/instagram.svg";

import { getStoryData , truncateText} from "../../helper";

interface Story {
    id: number;
    image: string;
}

interface User {
    id: string;
    avatar: string;
    story: Story[];
    name: string;
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

        if (clickPosition > storyWidth / 2) {
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
        <div className={styles.container}>
            <div className={`${styles.header} ${selectedUserIndex !== null ? styles.hidden : ""}`}>
                <img className={styles.instagramLogo} src={instagramLogo} alt="instagram logo" />
                <div className={styles.userIconContainer}>
                    {data.map((item, index) => (
                        <div className={styles.userDetails}>
                            <div
                                key={item.user.id}
                                onClick={() => {
                                    handleUserIconClick(index);
                                }}
                                className={styles.userIcon}
                            >
                                <img src={item.user.avatar} alt="user icon" />
                            </div>
                            <span className={styles.userIconName}>{truncateText(item.user.name)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedUserIndex !== null && currentStoryIndex !== null && data[selectedUserIndex]?.user?.story[currentStoryIndex!] && (
                <div className={styles.storyContainer} onClick={handleStoryClick}>
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
                    <div className={styles.progressBarContainer}>
                        {data[selectedUserIndex]?.user?.story.map((item, index) => (
                            <div key={item.id} className={styles.progressBar}>
                                <div
                                    // className={`${styles.progressBarFill}`}
                                    className={`${styles.progressBarFill} ${index <= currentStoryIndex ? styles.progressBarAnimation : ""}`}
                                    style={index <= currentStoryIndex ? { width: "100%" } : { width: "0%" }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <img src={data[selectedUserIndex].user.story[currentStoryIndex!].image} alt="story" />
                </div>
            )}
        </div>
    );
};

export default Story;
