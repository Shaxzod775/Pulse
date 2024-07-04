import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import * as routes from "../../../../Constants/routes";
import { getIconByGender } from "../../../../helpers/helpers";
import { deleteStudent } from "../../../../Slices/studentsSlice";
import {
  ButtonStyled,
  MenuStyled,
  TypographyStyled,
} from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";

const StudentCard = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  gender,
  email,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleDeleteStudent = () => {
    dispatch(deleteStudent(id));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const AvatarIcon = getIconByGender(
    gender,
    Icons.MaleAvatar,
    Icons.Female1Avatar
  );
  return (
    <CardStyled>
      <Box className="flex flex-col gap-sm" padding="9px">
        <Box className="flex justify-between items-start" padding="8px">
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(
                routes.CABINET + routes.STUDENTS + routes.getProfilePath(id)
              )
            }
          >
            <div className="flex items-start justify-between">
              {/* <img
                src={mariyaAvatar}
                alt="Mariya"
                width={50}
                height={"auto"}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "10px",
                }}
              /> */}
              <AvatarIcon style={{ minWidth: "50px", minHeight: "50px" }} />
            </div>

            <div className="flex flex-col justify-around">
              <TypographyStyled
                fontSize="1rem"
                fontWeight={600}
                letterSpacing="0.32px"
              >
                {firstName} {lastName}
              </TypographyStyled>
              <TypographyStyled
                color="#AEB2BA"
                fontSize="0.875rem"
                fontWeight={400}
              >
                Frontend, UI/UX
              </TypographyStyled>
            </div>
          </div>
          <div
            className="flex items-center justify-between gap-x3s"
            style={{
              marginTop: "-8px",
              marginRight: "-8px",
            }}
          >
            <IconButton
              color="purpleBlue"
              aria-controls={open ? "dots-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
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
                <Link
                  to={
                    routes.CABINET + routes.STUDENTS + routes.getProfilePath(id)
                  }
                >
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <span>Изменить профиль</span>
                  </ButtonStyled>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled color="crimson" onClick={handleDeleteStudent}>
                  <Icons.TrashCan />
                  <span>Удалить из списка</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </div>
        </Box>
        <Box className="flex flex-col" rowGap="12px">
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Group />
              <TypographyStyled>Группа</TypographyStyled>
            </InfoWithIcon>
            <TypographyStyled small>UI/UX GR1214-21</TypographyStyled>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Call />
              <TypographyStyled>Номер</TypographyStyled>
            </InfoWithIcon>
            <Link to="tel:/+998987654321" className="link flex gap-x3s">
              <TypographyStyled small>{phoneNumber}</TypographyStyled>
            </Link>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Messages />
              <TypographyStyled>E-mail</TypographyStyled>
            </InfoWithIcon>
            <Link to="mailto:example@gmail.com" className="link flex gap-x3s">
              <TypographyStyled small>{email}</TypographyStyled>
            </Link>
          </div>
        </Box>
        <div className="flex justify-between">
          <InfoWithIcon>
            <Icons.Documents />
            <TypographyStyled>Учитель</TypographyStyled>
          </InfoWithIcon>
          <Link
            to={routes.CABINET + routes.TEACHERS + routes.getProfilePath(id)}
            className="link flex gap-x4s"
          >
            <TypographyStyled small>Koptleulov Arslan</TypographyStyled>
          </Link>
        </div>
        <div className="flex justify-between">
          <InfoWithIcon>
            <Icons.ClockDashed />
            <TypographyStyled>01.01.2024</TypographyStyled>
          </InfoWithIcon>
          <InfoWithIcon>
            <Icons.CalendarDateContained />
            <TypographyStyled>01.07.2024</TypographyStyled>
          </InfoWithIcon>
        </div>
        <Link
          to={routes.CABINET + routes.STUDENTS + routes.getProfilePath(id)}
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
    </CardStyled>
  );
};

export default StudentCard;
