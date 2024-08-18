import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import * as routes from "../../../../Constants/routes";
import {
  formattedPhoneNumber,
  getIconByGender,
} from "../../../../helpers/helpers";
import { deleteTeacher } from "../../../../Slices/teachersSlice";
import {
  ButtonStyled,
  MenuStyled,
  TypographyStyled,
} from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";

const TeacherCard = ({
  id,
  firstName,
  lastName,
  middleName,
  phoneNumber,
  gender,
  secondPhoneNumber,
  groupsAmount,
}) => {
  const fullName = `${lastName} ${firstName} ${middleName}`;
  const queryParams = new URLSearchParams({ teacher: fullName }).toString();
  const linkPathToGroups = `${routes.CABINET}${routes.GROUPS}?${queryParams}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDeleteTeacher = () => {
    dispatch(deleteTeacher(id));
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
    <>
      <CardStyled>
        <Box
          className="full-height flex flex-col justify-between gap-sm"
          padding="9px"
        >
          <Box className="flex justify-between items-start" padding="8px">
            <div
              className="flex gap-xxs2 items-stretch cursor-pointer"
              onClick={() =>
                navigate(
                  routes.CABINET + routes.TEACHERS + routes.getProfilePath(id)
                )
              }
            >
              <div className="flex items-start justify-between">
                {/* <img
                src={arslanAvatar}
                alt="Arslan"
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
                <TypographyStyled fontWeight={600} letterSpacing="0.48px">
                  {firstName} {lastName}
                </TypographyStyled>
                <TypographyStyled
                  color="#AEB2BA"
                  fontWeight={400}
                  fontSize="0.875rem"
                >
                  Frontend, UI/UX
                </TypographyStyled>
              </div>
            </div>
            <IconButton
              color="purpleBlue"
              aria-controls={open ? "dots-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disableElevation
              onClick={handleClick}
              sx={{ top: "-8px", right: "-8px" }}
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
                    routes.CABINET + routes.TEACHERS + routes.getProfilePath(id)
                  }
                >
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <TypographyStyled fontWeight={400}>
                      Изменить профиль
                    </TypographyStyled>
                  </ButtonStyled>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled color="crimson" onClick={handleDeleteTeacher}>
                  <Icons.TrashCan />
                  <TypographyStyled fontWeight={400}>
                    Удалить из списка
                  </TypographyStyled>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </Box>
          <Box className="flex flex-col" rowGap="12px">
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Call />
                <TypographyStyled>Номер</TypographyStyled>
              </InfoWithIcon>
              <Link to={`tel:/${phoneNumber}`} className="link flex gap-x3s">
                <TypographyStyled small>
                  {formattedPhoneNumber(phoneNumber)}
                </TypographyStyled>
              </Link>
            </div>
            {secondPhoneNumber && (
              <div className="flex justify-between">
                <InfoWithIcon>
                  <Icons.Call />
                  <TypographyStyled>Доп. номер</TypographyStyled>
                </InfoWithIcon>
                <Link
                  to={`tel:/${secondPhoneNumber}`}
                  className="link flex gap-x3s"
                >
                  <TypographyStyled small>
                    {formattedPhoneNumber(secondPhoneNumber)}
                  </TypographyStyled>
                </Link>
              </div>
            )}
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Documents />
                <TypographyStyled>Количетсво групп</TypographyStyled>
              </InfoWithIcon>
              <Link to={linkPathToGroups} className="link">
                <TypographyStyled small>{groupsAmount}</TypographyStyled>
              </Link>
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
                <Icons.CalendarDateContained />
                <TypographyStyled>Дата трудоустройства</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>01.01.2024</TypographyStyled>
            </div>
          </Box>
          <div className="flex justify-between ">
            <InfoWithIcon>
              <Icons.Location />
              <TypographyStyled>Филиалы</TypographyStyled>
            </InfoWithIcon>
            <TypographyStyled small>IT Park Tashkent</TypographyStyled>
          </div>
          <Link
            to={routes.CABINET + routes.TEACHERS + routes.getProfilePath(id)}
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
    </>
  );
};

export default TeacherCard;
