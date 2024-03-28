import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
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
  InputLabelStyled,
  AutocompleteStyled,
} from "../Cabinet";
import CourseCard from "./CourseCard/CourseCard";
import { Icons } from "../../../Assets/Icons/icons";
import { DateRangeOutlined } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import NewCourseDialog from "./NewCourseDialog/NewCourseDialog";

const DialogButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.custom.spacing.sm,
  padding: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

function TagCheckbox({
  children,
  selected,
  setSelected,
  variant,
  ...otherProps
}) {
  //I will just seperate variant from other props so it does't interfere with dynamic variant
  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <Button
      variant={selected ? "contained" : "outlined"}
      onClick={handleClick}
      sx={{
        boxSizing: "border-box",
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        minWidth: "unset",
        padding: "6px",
        lineHeight: "inherit",
        border: `${selected ? `1px solid ${theme.palette.darkBlue.main}` : ""}`,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

const teachers = ["Eshmatov Toshmat", "Aliyev Shohrux", "Azizova Aziza"];
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

const Courses = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Root>
      <Main>
        <ContentHeader>
          <Title>Курсы</Title>
          <div className="flex items-center gap-sm">
            <ButtonStyled
              variant="contained"
              color="aqua"
              onClick={handleClickOpen}
            >
              Создать +
            </ButtonStyled>
          </div>
        </ContentHeader>
        <Grid
          container
          justifyContent="center"
          spacing={`${theme.custom.spacing.sm}px`}
          marginBottom={`${theme.custom.spacing.sm}px`}
        >
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <CourseCard />
          </Grid>
        </Grid>
      </Main>

      <NewCourseDialog open={open} handleClose={handleClose} />
    </Root>
  );
};

export default Courses;
