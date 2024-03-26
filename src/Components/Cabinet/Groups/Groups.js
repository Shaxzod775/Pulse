import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { Icons } from "../../../Assets/Icons/icons";

const theme = createTheme({
  palette: {
    aqua: {
      main: "#00988F",
      light: "#00988F",
      dark: "#00988F",
      contrastText: "#ffffff",
    },
    darkBlue: {
      main: "#1C274C",
      light: "#1C274C",
      dark: "#1C274C",
      contrastText: "#00000",
    },
    purpleGray: {
      main: "#A2A2C2",
      light: "#A2A2C2",
      dark: "#A2A2C2",
      contrastText: "#ffffff",
    },
    orange: {
      main: "#F79B16",
      light: "#FBF3E6",
      dark: "#F79B16",
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontSize: {
      xxs: "0.8rem",
      xs: "1rem",
      sm: "1.2rem",
      md: "1.75rem",
      lg: "2.5rem",
    },
    color: {
      darkBlue: "#1C274C",
    },
  },
  shape: {
    borderRadius: 12,
  },
  custom: {
    sidebarOpenWidth: 250,
    spacing: {
      x4s: 3,
      x3s: 5,
      xxs: 10,
      xs: 15,
      sm: 20,
      md2: 27,
      md: 30,
    },
  },
});

const Root = styled("div")(({ theme }) => ({
  width: `calc(100vw - ${
    theme.custom.sidebarOpenWidth + theme.custom.spacing.sm * 2
  }px)`,
  "& .flex": {
    display: "flex",
  },
  "& .flex-column": {
    flexDirection: "column",
  },
  "& .flex-row": {
    flexDirection: "row",
  },
  "& .items-center": {
    alignItems: "center",
  },
  "& .justify-between": {
    justifyContent: "space-between",
  },
  "& .justify-around": {
    justifyContent: "space-around",
  },
  "& .gap-x4s": {
    gap: theme.custom.spacing.x4s,
  },
  "& .gap-x3s": {
    gap: theme.custom.spacing.x3s,
  },
  "& .gap-xxs": {
    gap: theme.custom.spacing.xxs,
  },
  "& .gap-xs": {
    gap: theme.custom.spacing.xs,
  },
  "& .gap-sm": {
    gap: theme.custom.spacing.sm,
  },
  "& .gap-md": {
    gap: theme.custom.spacing.md,
  },
  "& .full-width": {
    width: "100%",
  },
}));

const Main = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.custom.spacing.md,
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Title = styled("h1")(({ theme }) => ({
  margin: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.lg,
  fontWeight: "1000",
}));

const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.typography.color.darkBlue,
  fontWeight: "600",
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
}));

const SelectStyled = styled(Select)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  color: theme.palette.darkBlue.main,
  display: "flex",
  alignItems: "center",
  "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
    {
      padding: theme.custom.spacing.xs,
      paddingRight: "32px",
      display: "flex",
      alignItems: "center",
      minHeight: theme.typography.fontSize.sm,
      height: "auto",
    },
  "& .MuiSelect-icon.MuiSelect-iconOutlined": {
    width: theme.typography.fontSize.sm,
    height: "auto",
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid #E5E5E5",
    },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  padding: theme.custom.spacing.xs,
  textTransform: "capitalize",
}));

const CardButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.xs,
  padding: theme.custom.spacing.xxs,
  textTransform: "capitalize",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.custom.spacing.x3s,
  "& svg": {
    width: theme.typography.fontSize.xs,
    height: "auto",
  },
}));

const GroupsContainer = styled("div")(({ theme }) => ({}));

const GroupCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.custom.spacing.sm,
  boxShadow: "none",
  fontSize: theme.typography.fontSize.xs,
  fontWeight: 600,
}));

const CardTag = styled("span")(({ theme, color = "orange" }) => ({
  borderRadius: theme.custom.spacing.xs,
  paddingTop: theme.custom.spacing.x3s,
  paddingBottom: theme.custom.spacing.x3s,
  paddingRight: theme.custom.spacing.xxs,
  paddingLeft: theme.custom.spacing.xxs,
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
}));

const Groups = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Main>
          <Header>
            <Title>Группы</Title>
            <div className="flex items-center gap-sm">
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabelStyled
                  htmlFor="teacher-select"
                  id="teacher-select-label"
                >
                  Преподаватель
                </InputLabelStyled>
                <SelectStyled
                  labelId="teacher-select-label"
                  id="teacher-select"
                  label="Преподаватель"
                  autoWidth
                  IconComponent={Icons.ArrowD}
                >
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </FormControl>
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabelStyled
                  htmlFor="teacher-select"
                  id="course-select-label"
                >
                  Курс
                </InputLabelStyled>
                <SelectStyled
                  labelId="course-select-label"
                  id="course-select"
                  label="Курс"
                  autoWidth
                  IconComponent={Icons.ArrowD}
                >
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabelStyled
                  htmlFor="teacher-select"
                  id="state-select-label"
                >
                  Статус
                </InputLabelStyled>
                <SelectStyled
                  labelId="state-select-label"
                  id="state-select"
                  label="Статус"
                  autoWidth
                  IconComponent={Icons.ArrowD}
                >
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </FormControl>
              <ButtonStyled variant="contained" color="aqua">
                Создать +
              </ButtonStyled>
            </div>
          </Header>
          <GroupsContainer>
            <Grid
              container
              justifyContent="center"
              spacing={`${theme.custom.spacing.sm}px`}
            >
              <Grid item xs="auto" md="auto" lg={3}>
                <GroupCard>
                  <CardContent
                    sx={{
                      padding: 0,
                      paddingBottom: `${theme.custom.spacing.md2}px`,
                      color: theme.typography.color.darkBlue,
                    }}
                  >
                    <div className="flex flex-column gap-sm">
                      <div className="flex items-center justify-between">
                        <Title
                          sx={{
                            fontSize: theme.typography.fontSize.sm,
                          }}
                        >
                          GR011-62
                        </Title>
                        <CardTag>Набор</CardTag>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-x4s">
                          <Icons.DateStart />
                          <span>12.08.2022</span>
                        </div>
                        <div className="flex items-center gap-x4s">
                          <Icons.DateEnd />
                          <span>10.10.2022</span>
                        </div>
                      </div>
                      <div className="flex flex-column gap-xs">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-x4s">
                            <Icons.Notebook />
                            <span>Python</span>
                          </div>
                          <div className="flex items-center gap-x4s">
                            <Icons.Clock />
                            <span>14:00-16:00</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-x4s">
                          <Icons.Calendar />
                          <span>Пн, Ср, Пт</span>
                        </div>
                        <div className="flex items-center gap-x4s">
                          <Icons.UsersGroupRounded />
                          <span>8 человек</span>
                        </div>
                        <div className="flex items-center gap-x4s">
                          <Icons.AcademicCap />
                          <span>Филиппов Александр</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions sx={{ padding: 0 }}>
                    <CardButton variant="contained" color="purpleGray">
                      <Icons.Edit />
                      <span>Редактировать</span>
                    </CardButton>
                  </CardActions>
                </GroupCard>
              </Grid>
            </Grid>
          </GroupsContainer>
        </Main>
      </Root>
    </ThemeProvider>
  );
};

export default Groups;
