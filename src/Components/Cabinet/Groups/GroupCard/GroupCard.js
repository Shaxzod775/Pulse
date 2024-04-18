import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  IconButton,
  CardContent,
  CardMedia,
  Divider,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  theme,
  CardStyled,
  ButtonStyled,
  MenuStyled,
} from "../../CabinetStyles";
import { Card, InfoLine } from "../../GridItemCardStyles";
import groupImage from "../../../../Assets/Images/Group.png";
import { format, weeksToDays } from "date-fns";
import { getRussianWord } from "../../../../helpers/helpers";

const weekDaysText = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const GroupCard = ({
  id,
  name = "Frontend",
  subject,
  startDate,
  endDate,
  weekDays = [0, 2, 4],
  teacher = "Arslan Koptleulov",
  duration,
  roomNumber,
  thumbnail,
  handleDeleteGroup,
}) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  // const durationInHours = duration * lessonsInOneMonth * lessonLength;
  // const navigate = useNavigate();
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
        <img
          src={thumbnail ? thumbnail : groupImage}
          alt="Group"
          width={"100%"}
          height={127}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "4px",
          }}
        />
        <div className="flex justify-between items-center">
          <div>
            <Typography fontWeight={600}>
              {name !== "" ? name : "GR000-00"}
            </Typography>
            <Typography className="font-xxs">
              {subject !== "" ? subject : "UI/UX"}
            </Typography>
          </div>
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
                  onClick={() => handleDeleteGroup(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить группу</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-xxs">
          <InfoLine>
            <Icons.CalendarContained />
            <div>Дата начала: {format(startDate, "dd.MM.yyyy")}</div>
          </InfoLine>
          <InfoLine>
            <Icons.ClockDashed />
            <div>Дата завершения: {format(endDate, "dd.MM.yyyy")}</div>
          </InfoLine>
          <InfoLine>
            <Icons.CalendarDateContained />
            <div>
              Дни урока:{" "}
              {weekDays.map(
                (weekDay, i) =>
                  `${weekDaysText[weekDay]}${
                    i < weekDays.length - 1 ? ", " : ""
                  }`
              )}
            </div>
          </InfoLine>
        </div>
        <Divider />
        <InfoLine>
          <Link
            to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
            className="link flex gap-x3s"
          >
            <Icons.SchoolAcademicCap />
            <div>Учитель: {teacher}</div>
          </Link>
        </InfoLine>
        <div className="flex gap-xs">
          <InfoLine small>
            <Icons.ClockContained />
            <div>
              {duration}{" "}
              {duration % 10 === 1 && duration % 100 !== 11
                ? "месяц"
                : duration % 10 >= 2 &&
                  duration % 10 <= 4 &&
                  (duration % 100 < 10 || duration % 100 >= 20)
                ? "месяца"
                : "месяцев"}
            </div>
          </InfoLine>
          <InfoLine small>
            <Icons.Door />
            <div>{roomNumber} кабинет</div>
          </InfoLine>
          <InfoLine small>
            <Icons.Group />
            <div>10 {getRussianWord(10, "ученик", "ученика", "учеников")}</div>
          </InfoLine>
        </div>
      </div>
    </Card>
  );
};

export default GroupCard;
