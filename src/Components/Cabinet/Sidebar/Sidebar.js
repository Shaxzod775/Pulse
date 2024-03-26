import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css"; // Assuming you will create a CSS file to style the sidebar
import {
  PaidOutlined,
  KeyboardDoubleArrowRightOutlined,
  PeopleAltOutlined,
  CalendarMonthOutlined,
  SchoolOutlined,
  DescriptionOutlined,
  PersonOutlineOutlined,
  MoveToInboxOutlined,
  CameraAltOutlined,
  SettingsOutlined,
  LogoutOutlined,
  Iso,
  KeyboardDoubleArrowLeftOutlined,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as routes from "../../../Constants/routes";
import { SIDEBAR_OPEN_WIDTH } from "../../../Constants/stylesConstants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-open-width",
      `${SIDEBAR_OPEN_WIDTH}px`
    );
  }, []);

  return (
    <div className={`${styles["sidebar"]} ${isOpen && styles["open"]}`}>
      <div className={styles["logo"]}>
        <Link to={routes.HOME}>ITEC</Link>
      </div>
      <div className={styles["menu-items"]}>
        <div
          className={`${styles["menu-item"]} ${styles["double-arrow"]}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconButton color="inherit">
            {isOpen ? (
              <KeyboardDoubleArrowLeftOutlined />
            ) : (
              <KeyboardDoubleArrowRightOutlined />
            )}
          </IconButton>
        </div>
        <Link
          to={routes.CABINET + routes.DASHBOARD}
          className={styles["menu-item"]}
        >
          <PaidOutlined />
          {isOpen && <Typography marginLeft="1rem">Dashboard</Typography>}
        </Link>
        <Link
          to={routes.CABINET + routes.GROUPS}
          className={styles["menu-item"]}
        >
          <PeopleAltOutlined />
          {isOpen && <Typography marginLeft="1rem">Groups</Typography>}
        </Link>
        <div className={styles["menu-item"]}>
          <CalendarMonthOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <SchoolOutlined />
        </div>
        <Link
          to={routes.CABINET + routes.COURSES}
          className={styles["menu-item"]}
        >
          <DescriptionOutlined />
          {isOpen && <Typography marginLeft="1rem">Courses</Typography>}
        </Link>
        <div className={styles["menu-item"]}>
          <PersonOutlineOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <MoveToInboxOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <CameraAltOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <SettingsOutlined />
        </div>
      </div>
      <div className={styles["logout"]}>
        <LogoutOutlined />
      </div>
    </div>
  );
};

export default Sidebar;
