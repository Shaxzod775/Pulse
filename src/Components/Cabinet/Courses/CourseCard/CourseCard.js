import React from "react";
import { Link } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Box,
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
import { theme, ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";
import { TypographyStyled } from "../../CabinetStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import { getRussianWord } from "../../../../helpers/helpers";

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
    <>
      <CardStyled>
        <Box className="flex flex-col" rowGap="20px">
          <img
            src={thumbnail ? thumbnail : courseImage}
            alt="Group"
            height={183}
            style={{ borderRadius: "15px 15px 0px 0px" }}
          />
          <Box className="flex justify-between items-center" paddingX="7px">
            <TypographyStyled fontWeight={600} fontSize="1.125rem">
              {name}
            </TypographyStyled>
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
                  <span>Изменить курс</span>
                </ButtonStyled>
                {/* </Link> */}
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled
                  color="crimson"
                  onClick={() => handleDeleteCourse(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить курс</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </Box>
          <Box className="flex flex-col" paddingX="9px" gap="12px">
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.ClockContained />
                <TypographyStyled>Продолжительность</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>
                {duration}{" "}
                {getRussianWord(duration, "месяц", "месяца", "месяцев")}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Group />
                <TypographyStyled>Учеников</TypographyStyled>
              </InfoWithIcon>
              <Link to={routes.CABINET + routes.STUDENTS} className="link">
                <TypographyStyled small>222</TypographyStyled>
              </Link>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Wallet />
                <TypographyStyled>Стоимость</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled letterSpacing="0.32px" small>
                <NumericFormat
                  value={price}
                  displayType="text" // Set to "input" if you want an input field
                  thousandSeparator=" "
                />{" "}
                сўм
              </TypographyStyled>
            </div>
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
    </>
  );
};

export default CourseCard;
