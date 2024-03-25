import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";

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
  },
  typography: {
    fontSize: {
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
}));

const Main = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.custom.spacing.md,
  "& .flex": {
    display: "flex",
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

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

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
}));

const SelectStyled = styled(Select)({
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  color: theme.palette.darkBlue.main,
  "& .MuiSelect-select": {
    padding: theme.custom.spacing.xs,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid #E5E5E5",
    },
});

const ButtonStyled = styled(Button)((props) => ({
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  padding: theme.custom.spacing.xs,
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
                >
                  <MenuItem value={1}>Eshmatov Toshmat</MenuItem>
                  <MenuItem value={2}>Aliyev Shohrux</MenuItem>
                  <MenuItem value={3}>Azizova Aziza</MenuItem>
                </SelectStyled>
              </FormControl>
              <ButtonStyled variant="contained" color="aqua">
                Boom +
              </ButtonStyled>
            </div>
          </Header>
        </Main>
      </Root>
    </ThemeProvider>
  );
};

export default Groups;
