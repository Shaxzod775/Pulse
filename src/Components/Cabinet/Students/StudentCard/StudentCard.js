import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  styled,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { Card, InfoLine } from "../../GridItemCardStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import mariyaAvatar from "../../../../Assets/Images/Avatars/Mariya.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";

const StudentCard = ({ id, name, handleDeleteStudent }) => {
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
      <div className="flex flex-col gap-xs">
        <div className="flex justify-between items-start">
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.STUDENTS + routes.PROFILE)
            }
          >
            <div className="flex items-start justify-between">
              {/* <img
                src={mariyaAvatar}
                alt="Mariya"
                width={50}
                height={"auto"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "10px",
                }}
              /> */}
              <Icons.MariyaAvatar />
            </div>

            <div className="flex flex-col justify-around">
              <Typography
                fontSize="1rem"
                fontWeight={600}
                letterSpacing="0.32px"
              >
                {name}
              </Typography>
              <Typography color="#AEB2BA" fontSize="0.875rem" fontWeight={400}>
                Front-end, UI/UX
              </Typography>
            </div>
          </div>
          <div
            className="flex items-center justify-between gap-x3s"
            style={{
              marginTop: "-8px",
              marginRight: "-8px",
            }}
          >
            <Link
              to={routes.CABINET + routes.STUDENTS + routes.PROFILE}
              className="link flex items-center justify-center"
            >
              <Icons.SquareArrowLeftUp />
            </Link>
            <IconButton
              color="purpleBlue"
              aria-controls={open ? "dots-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
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
                <Link to={routes.CABINET + routes.STUDENTS + routes.PROFILE}>
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <span>Изменить профиль</span>
                  </ButtonStyled>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled
                  color="crimson"
                  onClick={() => handleDeleteStudent(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить из списка</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </div>
        </div>
        <div className="flex flex-col gap-xs">
          <Divider />
          <InfoLine>
            <Icons.Group />
            <Typography>Группа: UI/UX GR1214-21</Typography>
          </InfoLine>
          <InfoLine>
            <Icons.Phone />
            <Typography>+998 (98) 765-43-21</Typography>
          </InfoLine>
          <InfoLine>
            <Icons.Messages />
            <Typography>example@gmail.com</Typography>
          </InfoLine>
          <Divider />
          <InfoLine small>
            <Icons.Documents />
            <Typography>Учитель: Eshmatov Toshmat</Typography>
          </InfoLine>
          <div className="flex gap-xxs">
            <InfoLine small>
              <Icons.ClockDashed />
              <Typography>01.01.2024</Typography>
            </InfoLine>
            <InfoLine small>
              <Icons.CalendarDateContained />
              <Typography>01.07.2024</Typography>
            </InfoLine>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;
