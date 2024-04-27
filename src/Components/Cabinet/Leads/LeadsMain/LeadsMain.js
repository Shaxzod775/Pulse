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
  customMenuProps,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Icons } from "../../../../Assets/Icons/icons";
import LeadCard from "../LeadCard/LeadCard";
import { BorderColor, Widgets } from "@mui/icons-material";
import NewLeadDialog from "../NewLeadDialog/NewLeadDialog";
import { leadSources, leadStatuses } from "../../../../Constants/testData";

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
  borderRadius: "20px",
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
  // const colorMain =
  //   status === "recycled"
  //     ? theme.palette.seaBlue.main
  //     : status === "dead"
  //     ? theme.palette.blue.main
  //     : status === "new"
  //     ? theme.palette.golden.main
  //     : theme.palette.orange.main;
  const colorMain =
    status === leadStatuses[0]
      ? theme.palette.orange.main
      : status === leadStatuses[1]
      ? theme.palette.blue.main
      : status === leadStatuses[2]
      ? theme.palette.golden.main
      : theme.palette.seaBlue.main;
  return (
    <Card sx={statusTitleCardStyles({ colorMain })}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-xxs2">
          <Icons.Circle color={colorMain} />
          <Typography>{status}</Typography>
        </div>
        <Chip label={`${leadsAmount} leads`} />
      </div>
    </Card>
  );
};

const courses = ["Frontend", "UI/UX", "Backend", "Flutter", "IT English"];

const LeadsMain = ({ leads, handleDeleteLead, handleAddLead }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                      selectedStatuses.length === leadSources.length) &&
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
                      if (selected.length === leadSources.length) {
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
                  {leadSources.map((status, i) => (
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
            <ButtonStyled
              variant="contained"
              color="purpleBlue"
              onClick={handleClickOpen}
            >
              <div className="flex items-center gap-x3s">
                <Icons.UserAdd />
                <span>Добавить лида</span>
              </div>
            </ButtonStyled>
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
            rowSpacing={"18px"}
            columnSpacing={"32px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {leadStatuses.map((leadStatus, i) => (
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

      <NewLeadDialog
        open={open}
        handleClose={handleClose}
        handleAddLead={handleAddLead}
      />
    </Root>
  );
};

export default LeadsMain;
