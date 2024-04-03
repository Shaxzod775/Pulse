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
import { theme, CardStyled, ButtonStyled } from "../../Cabinet";
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
    minWidth: "20px",
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

const StudentCard = () => {
  return (
    <Card>
      <div className="flex flex-col gap-xxs">
        <div className="flex justify-between items-start">
          <div className="flex gap-xxs2 items-center">
            <Icons.AnnaAvatar />
            <div className="flex flex-col justify-around">
              <CardText>Azizova Aziza</CardText>
              <CardText color="gray">Front-end, UI/UX</CardText>
            </div>
          </div>
          <Icons.MenuDots />
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
        <ButtonStyled
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
        </ButtonStyled>
      </div>
    </Card>
  );
};

export default StudentCard;
