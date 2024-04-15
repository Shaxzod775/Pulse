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
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { ButtonStyled, MenuStyled } from "../../CabinetStyles";
import { Card, InfoLine } from "../../GridItemCardStyles";
import courseImage from "../../../../Assets/Images/Course.png";
import { format, weeksToDays } from "date-fns";
import { auto } from "@popperjs/core";
import { borderRadius } from "@mui/system";
import { NumericFormat } from "react-number-format";
import * as routes from "../../../../Constants/routes";
import { Link, useNavigate } from "react-router-dom";

const CardText = styled(Typography)(
  ({ theme, fontFamily = "Poppins, Rubik, sans-serif" }) => ({
    fontFamily: fontFamily,
    fontSize: theme.typography.fontSize.xxs,
    lineHeight: "normal",
  })
);

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
  })
);

const LeadCard = ({ id, name, status, handleDeleteLead }) => {
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
    <Card>
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-start">
          <div
            className="flex gap-xxs2 items-stretch cursor-pointer"
            onClick={() =>
              navigate(routes.CABINET + routes.LEADS + routes.PROFILE)
            }
          >
            <Icons.AnnaAvatar />
            <div className="flex flex-col justify-around">
              <CardText>{name}</CardText>
              <CardText color="#AEB2BA">Today 12:40</CardText>
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
        </div>
        <Divider />
        <InfoLine>
          <Icons.Phone />
          <CardText>+998 (98) 765-43-21</CardText>
        </InfoLine>
        <InfoLine>
          <Icons.Messages />
          <CardText>example@gmail.com</CardText>
        </InfoLine>
        <Divider />
        <StatusChip label={statusLabel} status={status} />
      </div>
    </Card>
  );
};

export default LeadCard;
