import React from "react";
import styles from "./Header.module.css"; // Make sure to create the corresponding CSS Module file

import {
  Search as SearchIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <span className={styles["header-fullname"]}>Привет Александр</span>
      <div className={styles["header-right"]}>
        <div className={styles["header-search"]}>
          <SearchIcon className={styles["header-icon"]} />
          <input
            className={styles["header-search-input"]}
            placeholder="Поиск..."
          />
        </div>
        <LanguageIcon className={styles["header-icon"]} />
        <NotificationsIcon className={styles["header-icon"]} />
        <Link to={"/sign-in"} style={{ display: "flex" }}>
          <AccountCircleIcon className={styles["header-icon"]} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
