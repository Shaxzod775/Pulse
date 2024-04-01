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
import { ThemeProvider, Typography, styled } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import * as routes from "../../../Constants/routes";
import { SIDEBAR_OPEN_WIDTH } from "../../../Constants/stylesConstants";
import { Icons } from "../../../Assets/Icons/icons";
import { theme } from "../Cabinet";

const menuItemStyles = ({ theme, color = "purpleGrey" }) => ({
  padding: "10px",
  margin: "12px 0",
  borderRadius: "10px",
  fontSize: theme.typography.fontSize.xs,
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: theme.palette[color].contrastText,
  color: theme.palette[color].main,
  "&:hover": {
    backgroundColor: theme.palette[color].contrastText,
    color: theme.palette[color].light,
  },
});

const MenuLink = styled(NavLink)(({ theme, color = "purpleGrey" }) => ({
  ...menuItemStyles({ theme, color }),
  "&.active": {
    backgroundColor: theme.palette[color].main,
    color: theme.palette[color].contrastText,
  },
}));

const MenuAction = styled("div")(
  ({ theme, color = "purpleGrey", backgroundColor = "#fafafa" }) => ({
    ...menuItemStyles({ theme, color }),
    width: "100%",
    backgroundColor: theme.palette[color].contrastText,
    color: theme.palette[color].main,
    justifyContent: "center",
    backgroundColor: backgroundColor,
    "&:hover": {
      backgroundColor: theme.palette[color].light,
    },
  })
);

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-open-width",
      `${SIDEBAR_OPEN_WIDTH}px`
    );
  }, []);

  const menuLinks = [
    {
      link: routes.CABINET + routes.DASHBOARD,
      icon: Icons.Dashboard,
      text: "Dashboard",
    },
    {
      link: routes.CABINET + routes.TEACHERS,
      icon: Icons.Diploma,
      text: "Учителя",
    },
    {
      link: routes.CABINET + routes.STUDENTS,
      icon: Icons.SchoolAcademicCap,
      text: "Ученики",
    },
    {
      link: routes.CABINET + routes.GROUPS,
      icon: Icons.Group,
      text: "Группы",
    },
    {
      link: routes.CABINET + routes.COURSES,
      icon: Icons.Notebook,
      text: "Курсы",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
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
          {menuLinks.map((menuLink, i) => (
            <MenuLink
              to={menuLink.link}
              color="purpleBlue"
              className={(nav) => (nav.isActive ? "active" : "")}
              key={i}
            >
              <menuLink.icon />
              {isOpen && <div>{menuLink.text}</div>}
            </MenuLink>
          ))}
        </div>
        <div className={styles["logout"]}>
          <MenuAction color="grey" backgroundColor="#F9FAFB">
            {isOpen && <div>Сл. поддержки 24/7</div>}
          </MenuAction>
          <MenuAction color="crimson" backgroundColor="#FDF3F2">
            <Icons.Logout />
            {isOpen && <div>Log out</div>}
          </MenuAction>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
