import React from "react";
import styles from "./index.module.css";

import instagramLogo from "../../assets/instagram.svg";

function Header() {
    return (
        <div className={styles.header}>
            <img className={styles.instagramLogo} src={instagramLogo} alt="instagram logo" />
        </div>
    );
}

export default Header;
