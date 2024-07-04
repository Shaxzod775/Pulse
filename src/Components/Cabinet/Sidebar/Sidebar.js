import { Collapse, ThemeProvider, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../../Assets/Icons/icons";
import * as routes from "../../../Constants/routes";
import { SIDEBAR_OPEN_WIDTH } from "../../../Constants/stylesConstants";
import { useGlobal } from "../../../Core/global";
import { theme } from "../CabinetStyles";
import styles from "./Sidebar.module.css"; // Assuming you will create a CSS file to style the sidebar

const menuItemStyles = ({ theme, color = "purpleGrey" }) => ({
  padding: "10px",
  margin: "12px 0",
  borderRadius: "10px",
  fontSize: theme.typography.fontSize.xs,
  textDecoration: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  // gap: "10px",
  backgroundColor: theme.palette[color].contrastText,
  color: theme.palette[color].main,
  "& .text": {
    paddingLeft: "10px",
  },
  "&:hover": {
    backgroundColor: theme.palette[color].contrastText,
    color: theme.palette[color].light,
  },
});

const MenuLink = styled(NavLink)(({ theme, color = "purpleGrey" }) => ({
  ...menuItemStyles({ theme, color }),
  transition: "all .3s ease-in-out",
  "& div": {
    whiteSpace: "nowrap",
  },
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
    transition: "all .3s ease-in-out",
    "& div": {
      whiteSpace: "nowrap",
    },
    "&:hover": {
      backgroundColor: theme.palette[color].light,
    },
  })
);

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useGlobal((state) => state.logout);

  const handleLogout = async () => {
    await logout(); // Perform logout
    navigate(routes.HOME); // Navigate to HOME
  };

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
      link: routes.CABINET + routes.LEADS,
      icon: Icons.Group,
      text: "Лиды",
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
    {
      link: routes.CABINET + routes.TEACHERS,
      icon: Icons.Diploma,
      text: "Учителя",
    },
    {
      link: routes.CABINET + routes.PERSONAL,
      icon: Icons.Wallet,
      text: "Финансы",
    },
    {
      link: routes.CABINET + routes.PERSONAL,
      icon: Icons.ChartSquare,
      text: "Отчеты",
    },
    {
      link: routes.CABINET + routes.PERSONAL,
      icon: Icons.Graph,
      text: "Активность",
    },
    {
      link: routes.CABINET + routes.PERSONAL,
      icon: Icons.Settings,
      text: "Настройки",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className={`${styles["sidebar"]} ${isOpen && styles["open"]}`}>
        <Collapse orientation="horizontal" in={isOpen}>
          <div className={styles["logo"]}>
            <Link to={routes.HOME}>
              <Icons.Logo />
            </Link>
          </div>
        </Collapse>

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
              <Collapse orientation="horizontal" in={isOpen}>
                <div className="text">{menuLink.text}</div>
              </Collapse>
            </MenuLink>
          ))}
        </div>
        <div className={styles["logout"]}>
          <MenuAction color="grey" backgroundColor="#F9FAFB">
            ❤️
            <Collapse orientation="horizontal" in={isOpen}>
              {/* <div className="text">Забота о клиентах 24/7</div> */}
              <div>Поддержка 24/7</div>
            </Collapse>
          </MenuAction>
          <MenuAction
            onClick={handleLogout}
            color="crimson"
            backgroundColor="#FDF3F2"
          >
            <Icons.Logout />
            <Collapse orientation="horizontal" in={isOpen}>
              <div className="text">Log out</div>
            </Collapse>
          </MenuAction>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Sidebar;
