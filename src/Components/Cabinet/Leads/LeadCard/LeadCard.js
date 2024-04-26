import React from "react";
import {
  Button,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  styled,
  Chip,
  Box,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import {
  CardStyled,
  InfoWithIcon,
  TypographyStyled,
} from "../../GridItemCardStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import * as routes from "../../../../Constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { formattedPhoneNumber } from "../../../../helpers/helpers";

const StatusChip = styled((props) => <Chip {...props} />)(
  ({ theme, status }) => ({
    width: "max-content",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor:
      status === "recycled"
        ? theme.palette.seaBlue.light
        : status === "dead"
        ? theme.palette.blue.light
        : theme.palette.orange.light,
    "& .MuiChip-label": {
      color:
        status === "recycled"
          ? theme.palette.seaBlue.main
          : status === "dead"
          ? theme.palette.blue.main
          : theme.palette.orange.main,
      padding: "0",
      letterSpacing: "0.32px",
    },
    "& .MuiChip-icon": {
      width: "5px",
      margin: "0",
      marginRight: "8px",
      color:
        status === "recycled"
          ? theme.palette.seaBlue.main
          : status === "dead"
          ? theme.palette.blue.main
          : theme.palette.orange.main,
    },
  })
);

const LeadCard = ({
  id,
  name,
  phoneNumber,
  additionalPhoneNumber,
  email,
  leadSource,
  selectedCourseNames,
  courseLanguages,
  status,
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
  const statusLabel =
    status === "recycled"
      ? "Recycled"
      : status === "dead"
      ? "Dead"
      : status === "inProgress"
      ? "In Progress"
      : "Other";
  return (
    <CardStyled>
      <Box className="flex flex-col gap-sm" padding="9px">
        <Box className="flex justify-between items-start" padding="8px">
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.LEADS + routes.PROFILE)
            }
          >
            <Icons.AnnaAvatar style={{ minWidth: "50px", minHeight: "50px" }} />
            <div className="flex flex-col justify-around">
              <TypographyStyled fontWeight={600}>{name}</TypographyStyled>
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
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.Call />
              <TypographyStyled>Доп. Телефон</TypographyStyled>
            </InfoWithIcon>
            <Link to={`tel:/${additionalPhoneNumber}`} className="link">
              <TypographyStyled small>
                {formattedPhoneNumber(additionalPhoneNumber)}
              </TypographyStyled>
            </Link>
          </div>
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
              <TypographyStyled overflow="hidden" textOverflow="ellipsis" small>
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
              {courseLanguages.join(", ")}
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
              {selectedCourseNames.join(", ")}
            </TypographyStyled>
          </div>
          <div className="flex justify-between">
            <InfoWithIcon>
              <Icons.User />
              <TypographyStyled>Откуда лид</TypographyStyled>
            </InfoWithIcon>
            <TypographyStyled small>{leadSource}</TypographyStyled>
          </div>
        </Box>
        <Box className="flex flex-col" rowGap="8px">
          <InfoWithIcon>
            <Icons.ChatRoundDots />
            <TypographyStyled>Комментарий</TypographyStyled>
          </InfoWithIcon>
          <TypographyStyled small>
            Lorem ipsum dolor sit amet consectetur. In rhoncus euismod cras sit.
            Consectetur nulla.
          </TypographyStyled>
        </Box>
        <div className="flex items-center justify-between">
          <InfoWithIcon>
            <Icons.Star />
            <TypographyStyled>Статус</TypographyStyled>
          </InfoWithIcon>
          <StatusChip
            label={statusLabel}
            status={status}
            icon={<Icons.Circle />}
          />
          {/* <StatusChip icon={<Icons.Circle />} label="Example Chip" /> */}
        </div>
      </Box>
    </CardStyled>
  );
};

export default LeadCard;
