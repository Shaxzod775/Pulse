import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { TypographyStyled } from "../../CabinetStyles";
import groupImage from "../../../../Assets/Images/Group.png";
import { format, weeksToDays } from "date-fns";
import {
  calculateMonthDifference,
  getRussianWord,
} from "../../../../helpers/helpers";
import { weekDaysText } from "../../../../Constants/dateLocales";

const GroupCard = ({
  id,
  name,
  startDate,
  endDate,
  course,
  imageID,
  classDays,
  courseTime,
  roomNumber,
  teacher,
  handleDeleteGroup,
}) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  // const durationInHours = duration * lessonsInOneMonth * lessonLength;
  const navigate = useNavigate();
  // const lessonsAmount = courseTime.duration * classDays.length * 4; // months (group duration) * lessons in a week * weeks in a month

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
          src={imageID ? imageID : groupImage}
          alt="Group"
          width={"100%"}
          height={183}
          style={{ borderRadius: "15px 15px 0px 0px" }}
        />
        <Box className="flex justify-between items-center" paddingX="7px">
          <div className="flex gap-xs items-center">
            <TypographyStyled
              fontSize="1.125rem"
              fontWeight={600}
              color={theme.typography.color.darkBlue}
            >
              {name !== "" ? name : "GR000-00"}
            </TypographyStyled>
            <Icons.DividerDot color="#D1D5DB" />
            <TypographyStyled
              fontSize="1.125rem"
              fontWeight={600}
              color={theme.typography.color.darkBlue}
            >
              {course.name !== "" ? course.name : "UI/UX"}
            </TypographyStyled>
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
        <Box className="flex flex-col" rowGap="12px">
          <Box className="flex flex-col" rowGap="12px" paddingX="9px">
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.CalendarContained />
                <TypographyStyled>Дата начала</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>
                {format(startDate, "dd.MM.yyyy")}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.ClockDashed />
                <TypographyStyled>Дата завершения</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>
                {format(endDate, "dd.MM.yyyy")}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.CalendarDateContained />
                <TypographyStyled>Дни урока</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>
                {classDays.map(
                  (weekDay, i) =>
                    `${weekDaysText[weekDay]}${
                      i < classDays.length - 1 ? ", " : ""
                    }`
                )}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.SchoolAcademicCap />
                <TypographyStyled>Учитель</TypographyStyled>
              </InfoWithIcon>
              <Link
                to={
<<<<<<< HEAD
                  routes.CABINET +
                  routes.TEACHERS +
                  routes.getProfilePath(teacher.id)
=======
                  routes.CABINET + routes.TEACHERS + routes.getProfilePath(id)
>>>>>>> source-repo/main
                }
                className="link flex gap-x3s"
              >
                <TypographyStyled small>
                  {teacher.firstName} {teacher.lastName}
                </TypographyStyled>
              </Link>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.ClockContained />
                <TypographyStyled>Продолжительность</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>
                {course.duration}{" "}
                {getRussianWord(course.duration, "месяц", "месяца", "месяцев")}
                {/* / */}
                {/* {lessonsAmount}{" "} */}
                {/* {getRussianWord(lessonsAmount, "урок", "урока", "уроков")} */}
              </TypographyStyled>
            </div>
            <Box className="flex justify-between">
              <InfoWithIcon>
                <Icons.Door />
                <div>{roomNumber} кабинет</div>
              </InfoWithIcon>
              <Link to={routes.CABINET + routes.STUDENTS} className="link">
                <InfoWithIcon>
                  <Icons.Group />
                  <div>
                    10 {getRussianWord(10, "ученик", "ученика", "учеников")}
                  </div>
                </InfoWithIcon>
              </Link>
            </Box>
          </Box>
          <Link
            to={routes.CABINET + routes.GROUPS + routes.getProfilePath(id)}
            className="link full-width"
          >
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
      </Box>
    </CardStyled>
  );
};

export default GroupCard;
