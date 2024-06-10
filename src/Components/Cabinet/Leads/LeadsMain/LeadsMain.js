import React, { useEffect, useState } from "react";
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
  selectStylesV2,
  InputBaseStyledV2,
  TypographyStyled,
  CustomCheckbox,
  MenuStyled,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Icons } from "../../../../Assets/Icons/icons";
import LeadCard from "../LeadCard/LeadCard";
import { BorderColor, Widgets } from "@mui/icons-material";
import NewLeadDialog from "../NewLeadDialog/NewLeadDialog";
import { leadSources, leadStatuses } from "../../../../Constants/testData";
import useDebounce from "../../../../hooks/useDebounce";
import useCounter from "../../../../hooks/useCounter";

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
  const [leadDialogKey, increaseLeadDialogKey] = useCounter(0);

  const [filteredLeads, setFilteredLeads] = useState(leads);

  const [anchorStatus, setAnchorStatus] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedLeadSources, setSelectedLeadSources] = useState(["0"]);

  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);

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

  // Function to handle change in select with multiple property
  const handleChangeMultipleSelect = (setter) => (event) => {
    const {
      target: { value },
    } = event;
    setter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedCourses([]);
    setSelectedLeadSources(["0"]);
  };

  const handleLeadSourceFilter = (selectedLeadSources) => {
    if (selectedLeadSources.length === 1 && selectedLeadSources[0] === "0") {
      setFilteredLeads(leads);
    } else {
      const filtered = leads.filter((lead) =>
        selectedLeadSources.includes(lead.source)
      );
      setFilteredLeads(filtered);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    increaseLeadDialogKey();
  };

  const handleClickThreeDots = (event) => {
    setAnchorThreeDots(event.currentTarget);
  };
  const handleCloseThreeDotsMenu = () => {
    setAnchorThreeDots(null);
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useDebounce(
    () => {
      handleLeadSourceFilter(selectedLeadSources);
    },
    1000,
    [selectedLeadSources]
  );

  useEffect(() => setFilteredLeads(leads), [leads]);

  return (
    <Root
    // sx={{ maxHeight: "calc(100% - 122px)", display: "flex" }}
    >
      <Main sx={{ maxHeight: "calc(100vh - 42px)" }}>
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
                  onChange={handleChangeMultipleSelect(setSelectedStatuses)}
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
                  {leadStatuses.map((status, i) => (
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
                      "Все курсы"}
                  </span>
                </label>
                <SelectStyled
                  id="course-select"
                  autoWidth
                  multiple
                  value={selectedCourses}
                  onChange={handleChangeMultipleSelect(setSelectedCourses)}
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
              <Select
                multiple
                required
                value={selectedLeadSources}
                onChange={handleChangeMultipleSelect(setSelectedLeadSources)}
                renderValue={(selected) => {
                  if (selected.length === 1) return "Откуда лид";
                  return selected.slice(1).join(", ");
                }}
                MenuProps={customMenuProps}
                sx={{
                  ...selectStylesV2({ theme }),
                  minWidth: "200px",
                }}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {leadSources.map((status, i) => (
                  <MenuItem value={status} key={i}>
                    <CustomCheckbox
                      checked={selectedLeadSources.indexOf(status) > -1}
                    />
                    <ListItemText primary={status} />
                  </MenuItem>
                ))}
              </Select>
              <ButtonStyled
                variant="outlined"
                color="purpleBlue"
                onClick={handleClearFilters}
              >
                Сбросить фильтр
              </ButtonStyled>
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
            <ButtonStyled
              onClick={handleClickThreeDots}
              variant="outlined"
              color="purpleBlue"
              sx={{ minWidth: "0" }}
            >
              <Icons.MenuDots />
            </ButtonStyled>
            <MenuStyled
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorThreeDots}
              open={threeDotsMenuOpen}
              onClose={handleCloseThreeDotsMenu}
            >
              <MenuItem onClick={handleCloseThreeDotsMenu} disableRipple>
                <ButtonStyled color="purpleBlue">
                  <Icons.Pen />
                  <span>Скачать список</span>
                </ButtonStyled>
              </MenuItem>
              <MenuItem
                onClick={handleCloseThreeDotsMenu}
                disableRipple
              ></MenuItem>
            </MenuStyled>

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
        <Grid
          container
          justifyContent="start"
          rowSpacing={"18px"}
          columnSpacing={"32px"}
          paddingRight="44px"
        >
          {leadStatuses.map((leadStatus, i) => (
            <Grid item xs="auto" md="auto" lg={3} key={i}>
              <StatusTitle status={leadStatus} leadsAmount={5} />
            </Grid>
          ))}
        </Grid>
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
            {filteredLeads.map((lead, i) => (
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
        key={leadDialogKey}
        open={open}
        handleClose={handleClose}
        handleAddLead={handleAddLead}
      />
    </Root>
  );
};

export default LeadsMain;
