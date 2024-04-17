import React from "react";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  MenuItem,
  Typography,
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
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const weekDaysText = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const CourseCard = ({
  id,
  name,
  duration,
  price,
  thumbnail,
  handleDeleteCourse,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  const durationInHours = duration * lessonsInOneMonth * lessonLength;

  return (
    <Card>
      <div className="flex flex-col gap-xs">
        <img src={thumbnail ? thumbnail : courseImage} alt="Group" />
        <div className="flex justify-between items-center">
          <Typography fontWeight={600}>{name}</Typography>
          <div
            className="flex items-center gap-x3s"
            style={{ marginRight: "-8px" }}
          >
            <Link className="link">
              {/* <ButtonStyled> */}
              <div className="flex items-center gap-x3s">
                <Icons.SquareArrowLeftUp />
                <Typography>Открыть</Typography>
              </div>
              {/* </ButtonStyled> */}
            </Link>
            <IconButton
              color="purpleBlue"
              aria-controls={open ? "dots-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              // sx={{ right: "-8px" }}
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
                {/* <Link to={routes.CABINET + routes.STUDENTS + routes.PROFILE}> */}
                <ButtonStyled color="purpleBlue">
                  <Icons.Pen />
                  <span>Изменить группу</span>
                </ButtonStyled>
                {/* </Link> */}
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled
                  color="crimson"
                  onClick={() => handleDeleteCourse(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить группу</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </div>
        </div>
        <Divider />
        <div className="flex gap-xs">
          <InfoLine>
            <Icons.ClockContained />
            <div>{duration} месяцев</div>
          </InfoLine>
          <InfoLine>
            <Icons.Group />
            <div>222</div>
          </InfoLine>
        </div>
        <ButtonStyled
          variant="contained"
          color="purpleBlueLight"
          sx={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-xs">
            <Typography letterSpacing="0.32px">
              <NumericFormat
                value={price}
                displayType="text" // Set to "input" if you want an input field
                thousandSeparator=" "
              />{" "}
              UZS
            </Typography>
          </div>
        </ButtonStyled>
      </div>
    </Card>
  );
};

export default CourseCard;
