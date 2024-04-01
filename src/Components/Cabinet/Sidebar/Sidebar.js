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
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as routes from "../../../Constants/routes";
import { SIDEBAR_OPEN_WIDTH } from "../../../Constants/stylesConstants";
import { Icons } from "../../../Assets/Icons/icons";

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
        <Link to={routes.HOME}>
          <Icons.Logo />
        </Link>
      </div>
      <div
        className={styles["double-arrow"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Icons.SquareDoubleArrowLeft />
        ) : (
          <Icons.SquareDoubleArrowLeft />
        )}
      </div>
      <div className={styles["menu-items"]}>
        <Link
          to={routes.CABINET + routes.DASHBOARD}
          className={styles["menu-item"]}
        >
          <Icons.Dashboard />
          {isOpen && <div>Dashboard</div>}
        </Link>

        <Link
          to={routes.CABINET + routes.COURSES}
          className={styles["menu-item"]}
        >
          <DescriptionOutlined />
          {isOpen && <div>Учителя</div>}
        </Link>
        <Link
          to={routes.CABINET + routes.COURSES}
          className={styles["menu-item"]}
        >
          <DescriptionOutlined />
          {isOpen && <div>Ученики</div>}
        </Link>
        <Link
          to={routes.CABINET + routes.GROUPS}
          className={styles["menu-item"]}
        >
          <PeopleAltOutlined />
          {isOpen && <div>Группы</div>}
        </Link>
        <Link
          to={routes.CABINET + routes.GROUPS}
          className={styles["menu-item"]}
        >
          <PeopleAltOutlined />
          {isOpen && <div>Курсы</div>}
        </Link>
      </div>
      <div className={styles["logout"]}>
        <LogoutOutlined />
      </div>
    </div>
  );
};

export default Sidebar;
