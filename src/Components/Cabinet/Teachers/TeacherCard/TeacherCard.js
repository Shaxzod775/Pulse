import React from "react";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  IconButton,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled, ButtonStyled } from "../../Cabinet";
import courseImage from "../../../../Assets/Images/Course.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";

const Card = styled("div")(({ theme }) => ({
  padding: "14px",
  borderRadius: 10,
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[200]}`,
  "& svg": {
    color: theme.typography.color.purpleBlue,
  },
  fontSize: theme.typography.fontSize.xxs,
  "& .font-xxs": {
    fontSize: ".75rem",
  },
}));

const InfoLine = styled("div")(({ theme, small }) => ({
  display: "flex",
  alignItems: "center",
  gap: small ? "3px" : "5px",
  fontSize: small ? ".75rem" : "inherit",
  "& svg": {
    width: small ? "20px" : "24px",
    height: auto,
  },
}));

const CardText = styled(Typography)(
  ({ theme, fontFamily = "Poppins, Rubik, sans-serif" }) => ({
    fontFamily: fontFamily,
    fontSize: theme.typography.fontSize.xxs,
    lineHeight: "normal",
  })
);

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    // marginTop: theme.spacing(1),
    minWidth: 200,
    padding: "8px",
    color: theme.palette.mode === "light" ? "#374151" : theme.palette.grey[300],
    boxShadow:
      "0px 2px 4px 0px rgba(31, 41, 55, 0.06), 0px 4px 6px 0px rgba(31, 41, 55, 0.10);",
    "& .MuiMenu-list": {
      padding: "0",
    },
    "& .MuiMenuItem-root": {
      all: "unset",
      padding: "0",
      a: { textDecoration: "none" },
      "& .MuiButtonBase-root.MuiButton-root": {
        width: "100%",
        borderRadius: "4px",
        justifyContent: "start",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        span: { fontSize: "14px", lineHeight: "20px" },
      },
      "& .MuiSvgIcon-root": {
        fontSize: 20,
        // marginRight: theme.spacing(1.5),
      },
      "&:active": {
        // backgroundColor: theme.palette.purpleBlue.main,
      },
      "&:hover": { all: "unset" },
    },
  },
}));

const TeacherCard = ({ id, handleDeleteTeacher }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <div className="flex flex-col gap-xxs">
        <div className="flex justify-between items-start">
          {/* <Link
            to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
            className="link"
          > */}
          <div
            className="flex gap-xxs2 items-center cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.TEACHERS + routes.PROFILE)
            }
          >
            <Icons.AnnaAvatar />
            <div className="flex flex-col justify-around">
              <CardText>Eshmatov Toshmat</CardText>
              <CardText color="gray">Front-end, UI/UX</CardText>
            </div>
          </div>
          {/* </Link> */}
          <IconButton
            color="purpleBlue"
            aria-controls={open ? "dots-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
            sx={{ top: "-8px", right: "-8px" }}
          >
            <Icons.MenuDots />
          </IconButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <Link to={routes.CABINET + routes.TEACHERS + routes.PROFILE}>
                <ButtonStyled color="purpleBlue">
                  <Icons.Pen />
                  <span>Изменить профиль</span>
                </ButtonStyled>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ButtonStyled
                color="crimson"
                onClick={() => handleDeleteTeacher(id)}
              >
                <Icons.TrashCan />
                <span>Удалить из списка</span>
              </ButtonStyled>
            </MenuItem>
          </StyledMenu>
        </div>
        <Divider />
        <InfoLine>
          <Icons.Phone />
          <CardText>+998 (98) 765-43-21</CardText>
        </InfoLine>
        <div className="flex gap-xs">
          <InfoLine>
            <Icons.Documents />
            <CardText>Групп: 6</CardText>
          </InfoLine>
          <InfoLine>
            <Icons.Group />
            <CardText>222</CardText>
          </InfoLine>
        </div>
        <InfoLine>
          <Icons.CalendarDateContained />
          <CardText>01.01.2024</CardText>
        </InfoLine>
        <Divider />
        <InfoLine>
          <Icons.Location />
          <CardText>IT Park Tashkent</CardText>
        </InfoLine>
      </div>
    </Card>
  );
};

export default TeacherCard;
