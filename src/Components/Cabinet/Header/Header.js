import React from "react";
import styles from "./Header.module.css"; // Make sure to create the corresponding CSS Module file

import {
  Search as SearchIcon,
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Icon, IconButton, Toolbar } from "@mui/material";
import * as routes from "../../../Constants/routes";
import { Icons } from "../../../Assets/Icons/icons";
import { useGlobal } from "../../../Core/global";

const Header = () => {
  const auth = useGlobal((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className={styles["header"]}>
      <Icons.LogoFull
        onClick={() => navigate(routes.HOME)}
        style={{ cursor: "pointer" }}
      />

      <div className={styles["header-right"]}>
        <div className={styles["header-search"]}>
          <Icons.Search />
          <input
            className={styles["header-search-input"]}
            placeholder="Поиск..."
          />
        </div>
        <IconButton>
          <Icons.Notification />
        </IconButton>

        <Link to={routes.SIGN_IN} style={{ textDecoration: "none" }}>
          <div className={styles["avatar"]}>
            <Icons.MaleAvatar style={{ minWidth: "50px", minHeight: "50px" }} />
            <div className={styles["avatar-text"]}>
              {/* <span className={styles["name"]}>{auth.user.fullName}</span>
              <span className={styles["title"]}>{auth.user.roleName}</span> */}

              <span className={styles["name"]}>Administrator</span>
              <span className={styles["title"]}>Administrator</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
