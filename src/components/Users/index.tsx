import React from "react";
import styles from "./index.module.css";

interface UserProps {
    handleUserIconClick: (index: number) => void;
    data: any[];
    truncateText: (text: string) => string;
}

const Users = ({ handleUserIconClick, data, truncateText }: UserProps) => {
    return (
        <div className={styles.header}>
            <div id="usersList" className={styles.userIconContainer}>
                {data.map((item, index) => (
                    <div key={item.user.id} id={`user-${item.user.id}`} className={styles.userDetails}>
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
    );
};

export default Users;
