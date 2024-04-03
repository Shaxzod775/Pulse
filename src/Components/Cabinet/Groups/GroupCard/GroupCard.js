import React from "react";
import { Button, CardContent, CardMedia, Divider, styled } from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled } from "../../Cabinet";
import groupImage from "../../../../Assets/Images/Group.png";
import { format, weeksToDays } from "date-fns";

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
  gap: small ? theme.custom.spacing.xxs2 / 2 : theme.custom.spacing.xxs2,
  fontSize: small ? ".75rem" : "inherit",
  "& svg": {
    width: small ? "20px" : "",
  },
}));

const weekDaysText = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const GroupCard = ({ name, duration, techs, startDate, weekDays, teacher }) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  const durationInHours = duration * lessonsInOneMonth * lessonLength;
  return (
    <Card>
      <div className="flex flex-col gap-xxs">
        <img src={groupImage} alt="Group" />
        <div className="flex justify-between items-center">
          <div>
            <div>{name}</div>
            <div className="font-xxs">{techs[0]}</div>
          </div>
          <Icons.MenuDots />
        </div>
        <Divider />
        <div className="flex flex-col gap-8">
          <InfoLine>
            <Icons.CalendarContained />
            <div>Дата начала: {format(startDate, "dd.mm.yyyy")}</div>
          </InfoLine>
          <InfoLine>
            <Icons.ClockDashed />
            <div>Дата завершения: {format(startDate, "dd.mm.yyyy")}</div>
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
          <Icons.SchoolAcademicCap />
          <div>Учитель: {teacher}</div>
        </InfoLine>
        <div className="flex gap-xs">
          <InfoLine small>
            <Icons.ClockContained />
            <div>{duration} месяцев</div>
          </InfoLine>
          <InfoLine small>
            <Icons.Door />
            <div>2 кабинет</div>
          </InfoLine>
          <InfoLine small>
            <Icons.Group />
            <div>10</div>
          </InfoLine>
        </div>
      </div>
    </Card>
  );
};

export default GroupCard;
