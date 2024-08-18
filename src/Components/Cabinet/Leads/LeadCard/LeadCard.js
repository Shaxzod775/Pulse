import { Box, Chip, IconButton, MenuItem, styled } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import * as routes from "../../../../Constants/routes";
import {
  leadStatusesEnum,
  leadStatusesEnumToText,
} from "../../../../Constants/testData";
import { formattedPhoneNumber } from "../../../../helpers/helpers";
import {
  ButtonStyled,
  MenuStyled,
  TypographyStyled,
} from "../../CabinetStyles";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";

const StatusChip = styled((props) => <Chip {...props} />)(
  ({ theme, status }) => ({
    width: "max-content",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor:
      status === leadStatusesEnum[0]
        ? theme.palette.orange.light
        : status === leadStatusesEnum[1]
        ? theme.palette.blue.light
        : status === leadStatusesEnum[2]
        ? theme.palette.golden.light
        : theme.palette.seaBlue.light,
    "& .MuiChip-label": {
      color:
        status === leadStatusesEnum[0]
          ? theme.palette.orange.main
          : status === leadStatusesEnum[1]
          ? theme.palette.blue.main
          : status === leadStatusesEnum[2]
          ? theme.palette.golden.main
          : theme.palette.seaBlue.main,
      padding: "0",
      letterSpacing: "0.32px",
    },
    "& .MuiChip-icon": {
      width: "5px",
      margin: "0",
      marginRight: "8px",
      color:
        status === leadStatusesEnum[0]
          ? theme.palette.orange.main
          : status === leadStatusesEnum[1]
          ? theme.palette.blue.main
          : status === leadStatusesEnum[2]
          ? theme.palette.golden.main
          : theme.palette.seaBlue.main,
    },
  })
);

const LeadCard = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  secondPhoneNumber,
  email,
  source,
  course,
  langEnum,
  comment,
  statusEnum,
  handleDeleteLead,
}) => {
  const navigate = useNavigate();
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
      <Box
        className="full-height flex flex-col justify-between"
        padding="9px"
        rowGap="20px"
      >
        <Box className="flex flex-col" rowGap="20px">
          <Box className="flex justify-between items-start" padding="8px">
            <div
              className="flex gap-xxs2 items-stretch cursor-pointer"
              onClick={() =>
                navigate(routes.CABINET + routes.LEADS + routes.PROFILE)
              }
            >
              <Icons.MaleAvatar
                style={{ minWidth: "50px", minHeight: "50px" }}
              />
              <div className="flex flex-col justify-around">
                <TypographyStyled fontWeight={600}>
                  {firstName} {lastName}
                </TypographyStyled>
                <TypographyStyled color="#AEB2BA" fontWeight={400} small>
                  Today 12:40
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
                <Link to={routes.CABINET + routes.LEADS + routes.PROFILE}>
                  <ButtonStyled color="purpleBlue">
                    <Icons.Pen />
                    <span>Изменить профиль</span>
                  </ButtonStyled>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <ButtonStyled
                  color="crimson"
                  onClick={() => handleDeleteLead(id)}
                >
                  <Icons.TrashCan />
                  <span>Удалить из списка</span>
                </ButtonStyled>
              </MenuItem>
            </MenuStyled>
          </Box>
          <Box className="flex flex-col" rowGap="12px">
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Call />
                <TypographyStyled>Телефон</TypographyStyled>
              </InfoWithIcon>
              <Link to={`tel:/${phoneNumber}`} className="link">
                <TypographyStyled small>
                  {formattedPhoneNumber(phoneNumber)}
                </TypographyStyled>
              </Link>
            </div>
            {secondPhoneNumber && (
              <div className="flex justify-between">
                <InfoWithIcon>
                  <Icons.Call />
                  <TypographyStyled>Доп. Телефон</TypographyStyled>
                </InfoWithIcon>
                <Link to={`tel:/${secondPhoneNumber}`} className="link">
                  <TypographyStyled small>
                    {formattedPhoneNumber(secondPhoneNumber)}
                  </TypographyStyled>
                </Link>
              </div>
            )}

            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Messages />
                <TypographyStyled>E-mail</TypographyStyled>
              </InfoWithIcon>
              <Link
                to={`mailto:${email}`}
                className="link"
                style={{
                  maxWidth: "60%",
                }}
              >
                <TypographyStyled
                  overflow="hidden"
                  textOverflow="ellipsis"
                  small
                >
                  {email}
                </TypographyStyled>
              </Link>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.Global />
                <TypographyStyled>Язык курса</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled
                maxWidth="50%"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                small
              >
                {/* {langEnum.join(", ")} */}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.NotebookBookmark />
                <TypographyStyled>Направление</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled
                small
                maxWidth="50%"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {course.name}
              </TypographyStyled>
            </div>
            <div className="flex justify-between">
              <InfoWithIcon>
                <Icons.User />
                <TypographyStyled>Откуда лид</TypographyStyled>
              </InfoWithIcon>
              <TypographyStyled small>{source}</TypographyStyled>
            </div>
          </Box>
          <Box className="flex flex-col" rowGap="8px">
            <InfoWithIcon>
              <Icons.ChatRoundDots />
              <TypographyStyled>Комментарий</TypographyStyled>
            </InfoWithIcon>
            <TypographyStyled small>{comment}</TypographyStyled>
          </Box>
        </Box>
        <div className="flex items-center justify-between">
          <InfoWithIcon>
            <Icons.Star />
            <TypographyStyled>Статус</TypographyStyled>
          </InfoWithIcon>
          <StatusChip
            label={leadStatusesEnumToText[statusEnum]}
            status={statusEnum}
            icon={<Icons.Circle />}
          />
          {/* <StatusChip icon={<Icons.Circle />} label="Example Chip" /> */}
        </div>
      </Box>
    </CardStyled>
  );
};

export default LeadCard;
