import React from "react";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
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

const TeacherCard = () => {
  const navigate = useNavigate();
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
          <Icons.MenuDots />
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
