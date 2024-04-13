import React from "react";
import {
  Button,
  IconButton,
  CardContent,
  CardMedia,
  Divider,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled, ButtonStyled } from "../../CabinetStyles";
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 8,
    // marginTop: theme.spacing(1),
    minWidth: 200,
    padding: "8px",
    color: theme.palette.mode === "light" ? "#374151" : theme.palette.grey[300],
    boxShadow:
      "0px 2px 4px 0px rgba(31, 41, 55, 0.06), 0px 4px 6px 0px rgba(31, 41, 55, 0.10);",
    "& .MuiMenu-list": {
      padding: "0",
    },
    "& .MuiMenuItem-root": {
      all: "unset",
      padding: "0",
      a: { textDecoration: "none" },
      "& .MuiButtonBase-root.MuiButton-root": {
        width: "100%",
        borderRadius: "4px",
        justifyContent: "start",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        span: { fontSize: "14px", lineHeight: "20px" },
      },
      "& .MuiSvgIcon-root": {
        fontSize: 20,
        // marginRight: theme.spacing(1.5),
      },
      "&:active": {
        // backgroundColor: theme.palette.purpleBlue.main,
      },
      "&:hover": { all: "unset" },
    },
  },
}));

const GroupCard = ({
  id,
  name = "Front-end",
  startDate,
  endDate,
  weekDays = [0, 2, 4],
  teacher = "Eshmatov Toshmat",
  thumbnail,
  handleDeleteGroup,
}) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  // const durationInHours = duration * lessonsInOneMonth * lessonLength;
  // const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <div className="flex flex-col gap-xxs">
        <img
          src={thumbnail ? thumbnail : groupImage}
          alt="Group"
          width={"100%"}
          height={100}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "4px",
          }}
        />
        <div className="flex justify-between items-center">
          <div>
            <div>{name !== "" ? name : "Front-end"}</div>
            <div className="font-xxs">{"UI/UX"}</div>
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
          <StyledMenu
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
                <span>Изменить группу</span>
              </ButtonStyled>
              {/* </Link> */}
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ButtonStyled
                color="crimson"
                onClick={() => handleDeleteGroup(id)}
              >
                <Icons.TrashCan />
                <span>Удалить группу</span>
              </ButtonStyled>
            </MenuItem>
          </StyledMenu>
        </div>
        <Divider />
        <div className="flex flex-col gap-xxs">
          <InfoLine>
            <Icons.CalendarContained />
            <div>Дата начала: {format(startDate, "dd.MM.yyyy")}</div>
          </InfoLine>
          <InfoLine>
            <Icons.ClockDashed />
            <div>Дата завершения: {format(endDate, "dd.MM.yyyy")}</div>
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
            <div>{3} месяцев</div>
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
