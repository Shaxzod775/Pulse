import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Box,
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
import {
  leadSources,
  leadStatuses,
  leadStatusesEnum,
  leadStatusesEnumToText,
  leadStatusesTextToEnum,
} from "../../../../Constants/testData";
import useDebounce from "../../../../hooks/useDebounce";
import useCounter from "../../../../hooks/useCounter";
import { useSelector } from "react-redux";
import { selectAllCourseNames } from "../../../../Slices/coursesSlice";
import { getRussianWord } from "../../../../helpers/helpers";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../../helpers/StrictModeDroppable";
import api from "../../../../Core/api";
import { useLocalStorage } from "../../../../hooks/useStorage";

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
    status === leadStatusesEnum[0]
      ? theme.palette.orange.main
      : status === leadStatusesEnum[1]
      ? theme.palette.blue.main
      : status === leadStatusesEnum[2]
      ? theme.palette.golden.main
      : theme.palette.seaBlue.main;
  return (
    <Card sx={statusTitleCardStyles({ colorMain })}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-xxs2">
          <Icons.Circle color={colorMain} />
          <Typography>{leadStatusesEnumToText[status]}</Typography>
        </div>
        <Chip
          label={`${leadsAmount} ${getRussianWord(
            leadsAmount,
            "лид",
            "лида",
            "лидов"
          )}`}
        />
      </div>
    </Card>
  );
};

const LeadsMain = ({
  leads,
  handleDeleteLead,
  handleAddLead,
  handleUpdateLeadStatus,
}) => {
  const allCourseNames = useSelector(selectAllCourseNames);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [leadDialogKey, increaseLeadDialogKey] = useCounter(0);

  const [filteredLeads, setFilteredLeads] = useState({});

  const [anchorStatus, setAnchorStatus] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [anchorCourse, setAnchorCourse] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [selectedLeadSources, setSelectedLeadSources] = useState(["0"]);

  const [anchorThreeDots, setAnchorThreeDots] = useState(null);
  const threeDotsMenuOpen = Boolean(anchorThreeDots);
  const [groupedLeads, setGroupedLeads] = useLocalStorage("groupedLeads", {});

  useEffect(() => {
    // if groupedLeads in local storage is empty object with no keys
    if (Object.keys(groupedLeads).length === 0) {
      // initialize object, it becomes kinda like this: {NEW: [], IN_PROGRESS: [], RECYCLED: [], DEAD: []}
      const initialGroupedLeads = leadStatusesEnum.reduce((acc, status) => {
        acc[status] = []; // Initialize an empty array for each status
        return acc;
      }, {});
      // filling empty arrays of the corresponding keys with the corresponding leads where lead's statusEnum is equal to key in the object
      leads?.forEach((lead) => {
        const { statusEnum } = lead;
        initialGroupedLeads[statusEnum].push(lead);
      });
      setGroupedLeads(initialGroupedLeads); // Update the state
    } else {
      const updatedGroupedLeads = { ...groupedLeads };
      // Map existing leads to their corresponding keys in the object
      Object.entries(updatedGroupedLeads).forEach(([entry, leadsInEntry]) => {
        updatedGroupedLeads[entry] = leadsInEntry
          .filter((lead) => Boolean(lead))
          .map((leadInEntry) =>
            leads.find(
              (lead) => lead.id === leadInEntry.id && lead.statusEnum === entry
            )
          )
          .filter((lead) => Boolean(lead));

        // Filter new leads based on the statusEnum
        const newLeads = leads.filter((lead) => {
          return (
            lead.statusEnum === entry &&
            !leadsInEntry.some((leadInEntry) => leadInEntry.id === lead.id)
          );
        });

        // Add the new leads to the existing leads
        updatedGroupedLeads[entry] = [
          ...updatedGroupedLeads[entry],
          ...newLeads,
        ];
      });
      setGroupedLeads(updatedGroupedLeads);
    }
  }, [leads]);

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

  const handleLeadSourceFilter = (selectedLeadSources, currentLeads) => {
    if (selectedLeadSources.length === 1 && selectedLeadSources[0] === "0") {
      return currentLeads;
    } else {
      const filtered = {};
      Object.entries(currentLeads).forEach(([entry, leadsInEntry]) => {
        filtered[entry] = leadsInEntry.filter((lead) =>
          selectedLeadSources.includes(lead.source)
        );
      });
      return filtered;
    }
  };

  const handleCoursesSelectFilter = (selectedCourseNames, currentLeads) => {
    if (selectedCourseNames.length > 0) {
      const filtered = {};
      Object.entries(currentLeads).forEach(([entry, leadsInEntry]) => {
        filtered[entry] = leadsInEntry.filter((lead) =>
          selectedCourseNames.includes(lead.course.name)
        );
      });
      return filtered;
    } else {
      return currentLeads;
    }
  };

  const handleLeadStatusFilter = (selectedLeadStatuses, currentLeads) => {
    if (selectedLeadStatuses.length === 0) {
      return currentLeads;
    } else {
      const filtered = {};
      Object.entries(currentLeads).forEach(([entry, leadsInEntry]) => {
        filtered[entry] = selectedLeadStatuses.includes(entry)
          ? leadsInEntry
          : [];
      });
      return filtered;
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
      let filtered = { ...groupedLeads };
      if (
        selectedLeadSources.length !== 0 &&
        !(selectedLeadSources.length === 1 && selectedLeadSources[0] === "0")
      ) {
        filtered = handleLeadSourceFilter(selectedLeadSources, filtered);
      }
      if (selectedCourses.length > 0) {
        filtered = handleCoursesSelectFilter(selectedCourses, filtered);
      }
      if (selectedStatuses.length > 0) {
        filtered = handleLeadStatusFilter(selectedStatuses, filtered);
      }
      console.log(filtered);
      setFilteredLeads(filtered);
    },
    1000,
    [selectedLeadSources, selectedCourses, selectedStatuses, groupedLeads]
  );

  useEffect(() => setFilteredLeads({ ...groupedLeads }), [groupedLeads]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    // const column = groupedLeads[source.droppableId];
    const sourceLeads = [...groupedLeads[source.droppableId]];
    const destinationLeads = [...groupedLeads[destination.droppableId]];

    // if dragged item is dropped in the same leads
    if (source.droppableId === destination.droppableId) {
      sourceLeads.splice(source.index, 1);
      sourceLeads.splice(
        destination.index,
        0,
        leads.find((lead) => lead.id === draggableId)
      );

      const newGroupedLeads = {
        ...groupedLeads,
        [source.droppableId]: sourceLeads,
      };
      setGroupedLeads(newGroupedLeads);
    } else {
      sourceLeads.splice(source.index, 1);
      destinationLeads.splice(
        destination.index,
        0,
        leads.find((lead) => lead.id === draggableId)
      );

      const newGroupedLeads = {
        ...groupedLeads,
        [source.droppableId]: sourceLeads,
        [destination.droppableId]: destinationLeads,
      };

      setGroupedLeads(newGroupedLeads);

      const uuid = result.draggableId;
      const status = result.destination.droppableId;

      await handleUpdateLeadStatus(uuid, status);
    }
  };

  if (!groupedLeads || !filteredLeads) return;
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
                      // if (selected.length === leadSources.length) {
                      //   return "";
                      // }
                      return "..."; // Render "..." if multiple courses are selected
                    }

                    return leadStatusesEnumToText[selected];
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
                    <MenuItem value={leadStatusesTextToEnum[status]} key={i}>
                      <CustomCheckbox
                        checked={
                          selectedStatuses.indexOf(
                            leadStatusesTextToEnum[status]
                          ) > -1
                        }
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
                      selectedCourses.length === allCourseNames.length) &&
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
                      if (selected.length === allCourseNames.length) {
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
                  {allCourseNames.map((course, i) => (
                    <MenuItem value={course} key={i}>
                      <CustomCheckbox
                        checked={selectedCourses.indexOf(course) > -1}
                      />
                      <ListItemText primary={course} />
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
        <Grid
          container
          justifyContent="start"
          rowSpacing={"18px"}
          columnSpacing={"32px"}
          paddingRight="44px"
        >
          {leadStatusesEnum.map((leadStatusEnum, i) => (
            <Grid item xs="auto" md="auto" lg={3} key={i}>
              <StatusTitle
                status={leadStatusEnum}
                leadsAmount={filteredLeads[leadStatusEnum]?.length || 0}
              />
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
          {/* <Grid
            container
            justifyContent="start"
            rowSpacing={"18px"}
            columnSpacing={"32px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {filteredLeads.map((lead, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <LeadCard {...lead} handleDeleteLead={handleDeleteLead} />
              </Grid>
            ))}
          </Grid> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid
              container
              justifyContent="start"
              rowSpacing="18px"
              columnSpacing="32px"
              marginBottom={`${theme.custom.spacing.sm}px`}
            >
              {leadStatusesEnum.map((status) => (
                <Grid item xs="auto" md="auto" lg={3} key={status}>
                  <Droppable droppableId={status}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        minHeight="500px"
                        height="100%"
                      >
                        <Grid container direction="column" spacing={2}>
                          {filteredLeads[status].map((lead, index) => (
                            <Draggable
                              key={lead.id}
                              draggableId={lead.id}
                              index={index}
                            >
                              {(provided) => (
                                <Grid
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  item
                                >
                                  {/* Render your LeadCard component here */}
                                  <LeadCard
                                    {...lead}
                                    handleDeleteLead={handleDeleteLead}
                                  />
                                </Grid>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Grid>
                      </Box>
                    )}
                  </Droppable>
                </Grid>
              ))}
            </Grid>
          </DragDropContext>
        </div>
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
