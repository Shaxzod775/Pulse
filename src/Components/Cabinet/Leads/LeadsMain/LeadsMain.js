import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  ButtonBase,
  Card,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  TextFieldStyled,
  SelectStyled,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Icons } from "../../../../Assets/Icons/icons";
import LeadCard from "../LeadCard/LeadCard";
import { BorderColor, Widgets } from "@mui/icons-material";

const customMenuProps = {
  // onClick: (e) => e.stopPropagation(),
  // MenuListProps: {
  //   onClik: (e) => e.stopPropagation(),
  // },
  sx: {
    top: "10px",
    "& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper": {
      minWidth: "240px",
      boxShadow:
        "0px 2px 4px 0px rgba(31, 41, 55, 0.06), 0px 4px 6px 0px rgba(31, 41, 55, 0.10)",
    },
    "& .MuiList-root.MuiMenu-list": {
      padding: "8px",

      "& .MuiButtonBase-root.MuiMenuItem-root": {
        padding: "8px",
        borderRadius: "4px",
      },
    },
  },
  elevation: 0,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: "0 8px 0 0",
  color: "grey",
  "&.Mui-checked": {
    color: "grey",
  },
  "&:hover": {
    backgroundColor: "transparent", // remove hover background color
  },
}));

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const HeaderDiv = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
}));

const statusTitleCardStyles = ({ theme, colorMain }) => ({
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "none",
  border: "1px solid",
  borderColor: colorMain,
  "& svg": {
    width: "12px !important",
    height: "12px !important",
    circle: {
      r: "4",
    },
  },
  "& .MuiChip-root": {
    width: "max-content",
    padding: "8px 10px",
    borderRadius: "8px",
    backgroundColor: "#E5E7EB",
    ".MuiChip-label": {
      padding: "0",
      fontSize: ".875rem",
      letterSpacing: "0.14px",
      color: "#6B7280",
    },
  },
});
const StatusTitle = ({ status, leadsAmount }) => {
  const colorMain =
    status === "recycled"
      ? theme.palette.seaBlue.main
      : status === "dead"
      ? theme.palette.blue.main
      : status === "new"
      ? theme.palette.golden.main
      : theme.palette.orange.main;
  return (
    <Card sx={statusTitleCardStyles({ status, colorMain })}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-xxs2">
          <Icons.Circle color={colorMain} />
          <Typography>
            {status === "recycled"
              ? "Recycled"
              : status === "dead"
              ? "Dead"
              : status === "inProgress"
              ? "In Progress"
              : status === "new"
              ? "New"
              : "Other"}
          </Typography>
        </div>
        <Chip label={`${leadsAmount} leads`} />
      </div>
    </Card>
  );
};

const statuses = [
  "Активные студенты",
  "Закончившие курс",
  "Оплатившие",
  "Должники",
  "Ушли после пробных",
  "Замороженные ученики",
  "Не добавлены в группу",
];
const courses = ["Frontend", "UI/UX", "Backend", "Flutter", "IT English"];

const LeadsMain = ({ leads, handleDeleteLead }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const [anchorStatus, setAnchorStatus] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleChangeStatus = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedStatuses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourses(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClickStatusSelect = (e) => {
    setAnchorStatus(e.currentTarget);
  };
  const handleCloseStatusSelect = (e) => {
    e.stopPropagation();
    setAnchorStatus(null);
  };
  const handleClickCourseSelect = (e) => {
    setAnchorCourse(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourse(null);
  };

  return (
    <Root sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}>
      <Main>
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <ButtonStyled
              variant="outlined"
              sx={headerItemStyles}
              color="grey"
              onClick={goBack}
            >
              <Icons.ArrowL />
            </ButtonStyled>
            <Title>Лиды</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <HeaderDiv
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  label: { cursor: "pointer" },
                }}
                className="flex items-stretch full-height p-xxs2"
                onClick={handleClickStatusSelect}
              >
                <label
                  htmlFor="course-select"
                  className="flex items-center full-height"
                >
                  <Typography color="#b4b7c3">Статус</Typography>
                  <span style={{ margin: "0 -8px 0 8px", color: "#1C274C" }}>
                    {(selectedStatuses.length < 1 ||
                      selectedStatuses.length === statuses.length) &&
                      "Все"}
                  </span>
                </label>
                <SelectStyled
                  id="status-select"
                  autoWidth
                  multiple
                  value={selectedStatuses}
                  onChange={handleChangeStatus}
                  renderValue={(selected) => {
                    if (selected.length > 1) {
                      if (selected.length === statuses.length) {
                        return "";
                      }
                      return "..."; // Render "..." if multiple courses are selected
                    }
                    return selected;
                  }}
                  IconComponent={
                    Boolean(anchorStatus) ? Icons.ArrowUBold : Icons.ArrowDBold
                  }
                  onClose={handleCloseCourseSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorStatus,
                    open: Boolean(anchorStatus),
                    onClose: handleCloseStatusSelect,
                  }}
                  sx={{
                    "& > svg": { transform: "none !important" },
                  }}
                >
                  {statuses.map((status, i) => (
                    <MenuItem value={status} key={i}>
                      <CustomCheckbox
                        checked={selectedStatuses.indexOf(status) > -1}
                      />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </SelectStyled>
              </HeaderDiv>
              <HeaderDiv
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  label: { cursor: "pointer" },
                }}
                className="flex items-stretch full-height p-xxs2"
                onClick={handleClickCourseSelect}
              >
                <label
                  htmlFor="course-select"
                  className="flex items-center full-height"
                >
                  <Icons.NotebookBookmark color="#b4b7c3" />
                  <span style={{ margin: "0 -8px 0 8px", color: "#1C274C" }}>
                    {(selectedCourses.length < 1 ||
                      selectedCourses.length === courses.length) &&
                      "Все"}
                  </span>
                </label>
                <SelectStyled
                  id="course-select"
                  autoWidth
                  multiple
                  value={selectedCourses}
                  onChange={handleChangeCourse}
                  renderValue={(selected) => {
                    if (selected.length > 1) {
                      if (selected.length === courses.length) {
                        return "";
                      }
                      return "..."; // Render "..." if multiple courses are selected
                    }
                    return selected;
                  }}
                  IconComponent={
                    Boolean(anchorCourse) ? Icons.ArrowUBold : Icons.ArrowDBold
                  }
                  onClose={handleCloseCourseSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorCourse,
                    open: Boolean(anchorCourse),
                    onClose: handleCloseCourseSelect,
                  }}
                  sx={{
                    "& > svg": { transform: "none !important" },
                  }}
                >
                  {courses.map((course, i) => (
                    <MenuItem value={course} key={i}>
                      <CustomCheckbox
                        checked={selectedCourses.indexOf(course) > -1}
                      />
                      <ListItemText primary={course} />
                      {/* {course} */}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </HeaderDiv>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link to={routes.CABINET + routes.LEADS + routes.NEW}>
              <ButtonStyled variant="contained" color="purpleBlue">
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>Добавить лида</span>
                </div>
              </ButtonStyled>
            </Link>
            <ButtonStyled variant="outlined" color="purpleBlue">
              <div className="flex items-center gap-x3s">
                <Icons.InboxIn />
                <span>Скачать список</span>
              </div>
            </ButtonStyled>

            {/* <ButtonStyled
              variant="outlined"
              color="purpleBlue"
              sx={{ minWidth: "0" }}
            >
              <Icons.MenuDots />
            </ButtonStyled> */}
          </div>
        </div>
        {/* <Paper
          sx={{
            borderRadius: "20px",
            height: "90%",
            padding: "32px",
            boxShadow: "none",
          }}
        > */}
        <div
          style={{
            maxHeight: "100%",
            paddingRight: "32px",
            overflowY: "auto",
          }}
        >
          <Grid
            container
            justifyContent="start"
            rowSpacing={`${12}px`}
            columnSpacing={"32px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {["inProgress", "dead", "new", "recycled"].map((leadStatus, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <StatusTitle status={leadStatus} leadsAmount={5} />
              </Grid>
            ))}
            {leads.map((lead, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <LeadCard {...lead} handleDeleteLead={handleDeleteLead} />
                {/* <div>LEAD CARD</div> */}
              </Grid>
            ))}
          </Grid>
        </div>
        {/* </Paper> */}
      </Main>
    </Root>
  );
};

export default LeadsMain;
