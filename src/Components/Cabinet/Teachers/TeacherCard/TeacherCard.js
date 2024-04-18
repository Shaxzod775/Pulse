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
import {
  theme,
  CardStyled,
  ButtonStyled,
  MenuStyled,
} from "../../CabinetStyles";
import { Card, InfoLine } from "../../GridItemCardStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import arslanAvatar from "../../../../Assets/Images/Avatars/Arslan.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { getRussianWord } from "../../../../helpers/helpers";

const TeacherCard = ({ id, name, handleDeleteTeacher }) => {
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
      <div className="full-height flex flex-col justify-between gap-xs">
        <div className="flex justify-between items-start">
          {/* <Link
            to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
            className="link"
          > */}
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.TEACHERS + routes.PROFILE)
            }
          >
            <div className="flex items-start justify-between">
              {/* <img
                src={arslanAvatar}
                alt="Arslan"
                width={50}
                height={"auto"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "10px",
                }}
              /> */}
              <Icons.ArslanAvatar />
            </div>
            <div className="flex flex-col justify-around">
              <Typography fontWeight={600} letterSpacing="0.48px">
                {name}
              </Typography>
              <Typography color="#AEB2BA" fontWeight={400} fontSize="0.875rem">
                Frontend, UI/UX
              </Typography>
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
          <MenuStyled
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
                  <Typography fontWeight={400}>Изменить профиль</Typography>
                </ButtonStyled>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ButtonStyled
                color="crimson"
                onClick={() => handleDeleteTeacher(id)}
              >
                <Icons.TrashCan />
                <Typography fontWeight={400}>Удалить из списка</Typography>
              </ButtonStyled>
            </MenuItem>
          </MenuStyled>
        </div>
        <div className="flex flex-col gap-xs">
          <Divider />
          <InfoLine>
            <Link to="tel:/+998987654321" className="link flex gap-x3s">
              <Icons.Call />
              <Typography fontWeight={400}>+998 (98) 765-43-21</Typography>
            </Link>
          </InfoLine>
          <div className="flex gap-xs">
            <InfoLine>
              <Icons.Documents />
              <Typography fontWeight={400}>Групп: 6</Typography>
            </InfoLine>
            <InfoLine>
              <Icons.Group />
              <Typography>
                222 {getRussianWord(222, "ученик", "ученика", "учеников")}
              </Typography>
            </InfoLine>
          </div>
          <InfoLine>
            <Icons.CalendarDateContained />
            <Typography>01.01.2024</Typography>
          </InfoLine>
          <Divider />
          <div className="flex justify-between items-center">
            <InfoLine>
              <Icons.Location />
              <Typography>IT Park Tashkent</Typography>
            </InfoLine>
            <Link
              to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
              className="link flex items-center justify-center"
            >
              <Icons.SquareArrowLeftUp />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeacherCard;
