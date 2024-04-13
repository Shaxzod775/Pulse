import React from "react";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled, ButtonStyled } from "../../CabinetStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";

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

const weekDaysText = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const CourseCard = ({
  name,
  duration,
  techs,
  startDate,
  weekDays,
  teacher,
  price,
}) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  const durationInHours = duration * lessonsInOneMonth * lessonLength;
  return (
    <Card>
      <div className="flex flex-col gap-xxs">
        <img src={courseImage} alt="Group" />
        <div className="flex justify-between items-center">
          <Typography fontSize={theme.typography.fontSize.sm}>
            {name}
          </Typography>
          <Icons.MenuDots />
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
          color="purpleBlue"
          sx={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-xs">
            <Typography fontSize={theme.typography.fontSize.xs}>
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
