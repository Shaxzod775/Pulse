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
  Box,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";
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
  const lessonsAmount = duration * weekDays.length * 4; // months * lessons in a week * weeks in a month

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <CardStyled>
      <Box className="flex flex-col" rowGap="20px">
        <img
          src={thumbnail ? thumbnail : groupImage}
          alt="Group"
          width={"100%"}
          height={183}
          style={{ borderRadius: "15px 15px 0px 0px" }}
        />
        <Box className="flex justify-between items-center" paddingX="7px">
          <div className="flex gap-xs items-center">
            <Typography
              fontSize="1.125rem"
              fontWeight={600}
              color={theme.typography.color.darkBlue}
            >
              {name !== "" ? name : "GR000-00"}
            </Typography>
            <Icons.DividerDot color="#D1D5DB" />
            <Typography
              fontSize="1.125rem"
              fontWeight={600}
              color={theme.typography.color.darkBlue}
            >
              {subject !== "" ? subject : "UI/UX"}
            </Typography>
          </div>
          <IconButton
            color="purpleBlue"
            aria-controls={open ? "dots-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            onClick={handleClick}
            sx={{ right: "-8px", marginY: "-8px" }}
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
        </Box>

        <Box className="flex flex-col" rowGap="12px" paddingX="9px">
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.CalendarContained />
              <Typography>Дата начала</Typography>
            </InfoWithIcon>
            <Typography>{format(startDate, "dd.MM.yyyy")}</Typography>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.ClockDashed />
              <Typography>Дата завершения</Typography>
            </InfoWithIcon>
            <Typography>{format(endDate, "dd.MM.yyyy")}</Typography>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.CalendarDateContained />
              <Typography>Дни урока</Typography>
            </InfoWithIcon>
            <Typography>
              {weekDays.map(
                (weekDay, i) =>
                  `${weekDaysText[weekDay]}${
                    i < weekDays.length - 1 ? ", " : ""
                  }`
              )}
            </Typography>
          </div>
        </Box>
        <Box className="flex justify-between" paddingX="9px">
          <InfoWithIcon>
            <Icons.SchoolAcademicCap />
            <Typography>Учитель</Typography>
          </InfoWithIcon>
          <Link
            to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
            className="link flex gap-x3s"
          >
            <Typography>{teacher}</Typography>
          </Link>
        </Box>
        <Box className="flex justify-between">
          <InfoWithIcon small>
            <Icons.ClockContained />
            <div>
              {duration}{" "}
              {getRussianWord(duration, "месяц", "месяца", "месяцев")}/
              {lessonsAmount}{" "}
              {getRussianWord(lessonsAmount, "урок", "урока", "уроков")}
            </div>
          </InfoWithIcon>
          <InfoWithIcon small>
            <Icons.Door />
            <div>{roomNumber} кабинет</div>
          </InfoWithIcon>
          <Link to={routes.CABINET + routes.STUDENTS} className="link">
            <InfoWithIcon small>
              <Icons.Group />
              <div>
                10 {getRussianWord(10, "ученик", "ученика", "учеников")}
              </div>
            </InfoWithIcon>
          </Link>
        </Box>
        <Link className="link full-width">
          <ButtonStyled
            fullWidth
            variant="contained"
            color="purpleBlueLight"
            sx={{ borderRadius: "15px" }}
          >
            <div className="flex items-center gap-x3s">
              <Icons.SquareArrowLeftUp />
              <Typography>Открыть</Typography>
            </div>
          </ButtonStyled>
        </Link>
      </Box>
    </CardStyled>
  );
};

export default GroupCard;
