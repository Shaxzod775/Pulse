import React, { useState } from "react";
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
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles["sidebar"]} ${isOpen && styles["open"]}`}>
      <div className={styles["logo"]}>
        <Link to={"/"}>ITEC</Link>
      </div>
      <div className={styles["menu-items"]}>
        <div className={styles["menu-item"]} onClick={() => setIsOpen(!isOpen)}>
          <KeyboardDoubleArrowRightOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <PaidOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <PeopleAltOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <CalendarMonthOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <SchoolOutlined />
        </div>
        <div className={styles["menu-item"]}>
          <DescriptionOutlined />
        </div>
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
