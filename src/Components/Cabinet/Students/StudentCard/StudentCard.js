import React from "react";
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
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import * as routes from "../../../../Constants/routes";
import { Link, useNavigate } from "react-router-dom";

const CardText = styled(Typography)(
  ({ theme, fontFamily = "Poppins, Rubik, sans-serif" }) => ({
    fontFamily: fontFamily,
    fontSize: theme.typography.fontSize.xxs,
    lineHeight: "normal",
  })
);

const StudentCard = ({ id, handleDeleteStudent }) => {
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
          <div
            className="flex gap-xxs2 items-center cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.STUDENTS + routes.PROFILE)
            }
          >
            <Icons.AnnaAvatar />
            <div className="flex flex-col justify-around">
              <CardText>Azizova Aziza</CardText>
              <CardText color="gray">Front-end, UI/UX</CardText>
            </div>
          </div>
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
        <Divider />
        <InfoLine>
          <Icons.Group />
          <CardText>Группа: Front-end GR1214-21</CardText>
        </InfoLine>
        <InfoLine>
          <Icons.Phone />
          <CardText>+998 (98) 765-43-21</CardText>
        </InfoLine>
        <InfoLine>
          <Icons.Messages />
          <CardText>example@gmail.com</CardText>
        </InfoLine>
        <Divider />
        <InfoLine small>
          <Icons.Documents />
          <CardText>Учитель: Eshmatov Toshmat</CardText>
        </InfoLine>
        <div className="flex gap-xxs">
          <InfoLine small>
            <Icons.ClockDashed />
            <CardText>01.01.2024</CardText>
          </InfoLine>
          <InfoLine small>
            <Icons.CalendarDateContained />
            <CardText>01.07.2024</CardText>
          </InfoLine>
        </div>
        {/* <ButtonStyled
          variant="contained"
          color="purpleBlueLight"
          sx={{ borderRadius: "20px", padding: "8px" }}
        >
          <InfoLine small>
            <Icons.Wallet style={{ color: "inherit" }} />
            <CardText>
              <NumericFormat
                value={1212000}
                displayType="text" // Set to "input" if you want an input field
                thousandSeparator=" "
              />{" "}
              UZS
            </CardText>
          </InfoLine>
        </ButtonStyled> */}
      </div>
    </Card>
  );
};

export default StudentCard;
