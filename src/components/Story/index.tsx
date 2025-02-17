import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import { getStoryData, truncateText } from "../../helper";

// import components
import Header from "../Header";
import Users from "../Users";
import UserStory from "../UserStory";

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
    const [toggle, setToggle] = useState<boolean>(false);

    // fetch user story data
    const fetchStoryData = async () => {
        const data: DataItem[] = await getStoryData();
        setData(data);
    };

    // move to the next story
    const nextStory = () => {
        const userStories = data[selectedUserIndex!]?.user?.story;

        setCurrentStoryIndex((prevIndex) => {
            // for the current user there is more story exist
            if (prevIndex !== null && userStories && prevIndex + 1 < userStories.length) {
                return prevIndex + 1;
            } else {
                // when stories ends for the current user, move to the next user
                setSelectedUserIndex((userIndex) => {
                    const nextUserIndex = (userIndex! + 1) % data.length;
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
            // for the current user there is more story exist
            if (prevIndex !== null && prevIndex > 0) {
                setToggle((prev) => !prev);
                return prevIndex - 1;
            } else {
                // when stories ends for the current user, move to the previous user
                setSelectedUserIndex((userIndex) => {
                    let previousUserIndex: number;
                    if (userIndex === 0) {
                        previousUserIndex = data.length - 1;
                        console.log("previousUserIndex", previousUserIndex);
                        
                    } else {
                        previousUserIndex = userIndex! - 1;
                    }
                    return previousUserIndex;
                });
                return 0;
            }
        });
    };

    // when the user clicks on the story move to the next or previous story
    const handleStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const storyElement = e.currentTarget;
        if (!storyElement) return;
        const clickPosition = e.clientX - storyElement.getBoundingClientRect().left;
        const storyWidth = storyElement.offsetWidth;

        // depending on the click position move to the next or previous story
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
            <div className={selectedUserIndex !== null ? styles.hidden : ""}>
                <Header />
                <Users handleUserIconClick={handleUserIconClick} data={data} truncateText={truncateText} />
            </div>

            {selectedUserIndex !== null && currentStoryIndex !== null && data[selectedUserIndex]?.user?.story[currentStoryIndex!] && (
                <UserStory toggle={toggle} handleStoryClick={handleStoryClick} data={data} selectedUserIndex={selectedUserIndex} currentStoryIndex={currentStoryIndex} closeStory={closeStory} />
            )}
        </div>
    );
};

export default Story;
