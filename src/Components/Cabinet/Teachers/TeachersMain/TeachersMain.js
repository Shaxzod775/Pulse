import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as routes from "../../../../Constants/routes";
import {
  Grid,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  styled,
} from "@mui/material";
import {
  theme,
  ButtonStyled,
  Main,
  Root,
  Title,
  InputBaseStyledV2,
  selectStylesV2,
  customMenuProps,
  CustomCheckbox,
} from "../../CabinetStyles";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import TeacherCard from "../TeacherCard/TeacherCard";
import NewCourseDialog from "../../Courses/NewCourseDialog/NewCourseDialog";
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

const teachers = [
  "Koptleulov Arslan",
  "Ilya Starodubtsev",
  "Aziz Mamajonov",
  "Muhammad Matchonov",
];
const techs = [
  "JavaScript",
  "Django",
  "Python",
  "GitHub",
  "React",
  "Node.js",
  "Ruby on Rails",
  "Vue.js",
  "Angular",
  "Flask",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Heroku",
  "CSS",
  "HTML",
  "TypeScript",
  "GraphQL",
];

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});
NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TeachersMain = ({ teachers, handleDeleteTeacher }) => {
  const navigate = useNavigate();
  const { allCourseNames } = useCourses();

  const [selectedTeacherStatuses, setSelectedTeacherStatuses] = useState(["0"]);

  const [selectedCourses, setSelectedCourses] = useState(["0"]);

  const handleChangeMultipleSelect = (setter) => (event) => {
    const {
      target: { value },
    } = event;
    setter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };
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
            <Title>Учителя</Title>
            <div className="flex items-stretch gap-xxs full-height">
              <InputBaseStyledV2
                placeholder="Поиск по учителю..."
                sx={{
                  position: "relative",
                  minWidth: "240px",
                  width: "240px",
                  color: theme.typography.color.darkBlue,
                  "& .MuiInputBase-input": { paddingLeft: "36px" },
                }}
                startAdornment={
                  <Icons.Search
                    color="#AEB2BA"
                    width="20px"
                    style={{ position: "absolute", left: "8px", zIndex: "1" }}
                  />
                }
              />
              <Select
                multiple
                required
                value={selectedTeacherStatuses}
                onChange={handleChangeMultipleSelect(
                  setSelectedTeacherStatuses
                )}
                renderValue={(selected) => {
                  if (selected.length === 1) return "Статус учителя";
                  return selected.slice(1).join(", ");
                }}
                MenuProps={customMenuProps}
                sx={{ ...selectStylesV2({ theme }), minWidth: "240px" }}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {[
                  "Действующие учители",
                  "Teacher status 1",
                  "Teacher status 2",
                  "Teacher status 3",
                ].map((groupStatus) => (
                  <MenuItem key={groupStatus} value={groupStatus}>
                    <CustomCheckbox
                      checked={
                        selectedTeacherStatuses.indexOf(groupStatus) > -1
                      }
                    />
                    <ListItemText primary={groupStatus} />
                  </MenuItem>
                ))}
              </Select>
              <Select
                multiple
                required
                value={selectedCourses}
                onChange={handleChangeMultipleSelect(setSelectedCourses)}
                renderValue={(selected) => {
                  if (selected.length === 1) return "Все курсы";
                  return selected.slice(1).join(", ");
                }}
                MenuProps={customMenuProps}
                sx={{ ...selectStylesV2({ theme }), minWidth: "200px" }}
                input={<InputBaseStyledV2 />}
                IconComponent={Icons.ArrowDBold}
              >
                {allCourseNames.map((courseName) => (
                  <MenuItem key={courseName} value={courseName}>
                    <CustomCheckbox
                      checked={selectedCourses.indexOf(courseName) > -1}
                    />
                    <ListItemText primary={courseName} />
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <Link
              to={routes.CABINET + routes.TEACHERS + routes.NEW}
              className="link"
            >
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                // onClick={handleClickOpen}
              >
                <div className="flex items-center gap-x3s">
                  <Icons.UserAdd />
                  <span>Добавить учителя</span>
                </div>
              </ButtonStyled>
            </Link>
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
            // spacing={`${12}px`}
            columnSpacing={"32px"}
            rowSpacing={"18px"}
            marginBottom={`${theme.custom.spacing.sm}px`}
          >
            {teachers.map((teacher, i) => (
              <Grid item xs="auto" md="auto" lg={3} key={i}>
                <TeacherCard
                  {...teacher}
                  handleDeleteTeacher={handleDeleteTeacher}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Main>

      {/* <NewCourseDialog
        open={open}
        handleClose={handleClose}
        handleAddCourse={handleAddTeacher}
      /> */}
    </Root>
  );
};

export default TeachersMain;
