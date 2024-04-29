import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Button,
  ButtonBase,
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
  CustomCheckbox,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import StudentCard from "../StudentCard/StudentCard";
import { Icons } from "../../../../Assets/Icons/icons";
import { useCourses } from "../../../../contexts/Courses.context";

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

const StudentsMain = ({ students, handleDeleteStudent }) => {
  const { allCourseNames } = useCourses();
  const navigate = useNavigate();

  const [anchorCourseSelect, setAnchorCourseSelect] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleClickCourseSelect = (e) => {
    setAnchorCourseSelect(e.currentTarget);
  };
  const handleCloseCourseSelect = (e) => {
    e.stopPropagation();
    setAnchorCourseSelect(null);
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

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  useEffect(
    () => {
      const handleClickOutside = (event) => {
        // if (
        //   anchorTeacher &&
        //   !anchorTeacher.parentElement.contains(event.target)
        // ) {
        //   handleCloseTeacherSelect();
        // } else
        if (anchorCourseSelect && !anchorCourseSelect.contains(event.target)) {
          handleCloseCourseSelect();
        }
      };
      // const handleClickInside = (event) => {}

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [
      // anchorTeacher,
      // handleCloseTeacherSelect,
      // anchorCourse,
      // handleCloseCourseSelect,
    ]
  );

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
            <Title>Ученики</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <HeaderDiv className="flex items-stretch full-height p-r-xxs2 p-l-xxs2">
                <div className="flex items-center">
                  <Icons.Search
                    style={{ boxSizing: "content-box", paddingRight: "8px" }}
                    color="#E5E7EB"
                  />
                  <InputBase
                    sx={{ color: theme.typography.color.darkBlue }}
                    placeholder="Поиск по ученику..."
                  />
                </div>
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
                      if (selected.length === allCourseNames.length) {
                        return "";
                      }
                      return "..."; // Render "..." if multiple courses are selected
                    }
                    return selected;
                  }}
                  IconComponent={
                    Boolean(anchorCourseSelect)
                      ? Icons.ArrowUBold
                      : Icons.ArrowDBold
                  }
                  onClose={handleCloseCourseSelect}
                  MenuProps={{
                    ...customMenuProps,
                    anchorEl: anchorCourseSelect,
                    open: Boolean(anchorCourseSelect),
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
                      {/* {course} */}
                    </MenuItem>
                  ))}
                </SelectStyled>
              </HeaderDiv>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link to={routes.CABINET + routes.STUDENTS + routes.NEW}>
              <ButtonStyled variant="contained" color="purpleBlue">
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>Добавить ученика</span>
                </div>
              </ButtonStyled>
            </Link>
            {/* <ButtonStyled variant="outlined" color="purpleBlue">
              <div className="flex items-center gap-x3s">
                <Icons.InboxIn />
                <span>Скачать список</span>
              </div>
            </ButtonStyled> */}

            <ButtonStyled
              variant="outlined"
              color="purpleBlue"
              sx={{ minWidth: "0" }}
            >
              <Icons.MenuDots />
            </ButtonStyled>
          </div>
        </div>
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
            columnSpacing={"32px"}
            rowSpacing={"18px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {students.map((student, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <StudentCard
                  {...student}
                  handleDeleteStudent={handleDeleteStudent}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Main>
    </Root>
  );
};

export default StudentsMain;
