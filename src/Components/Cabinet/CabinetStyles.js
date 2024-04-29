import {
  createTheme,
  styled,
  InputLabel,
  Select,
  Button,
  Card as GridCard,
  TextField,
  Autocomplete,
  Menu,
  FormControl,
  Typography,
  InputBase,
  Checkbox,
} from "@mui/material";
import { SIDEBAR_OPEN_WIDTH } from "../../Constants/stylesConstants";
import { BorderColor } from "@mui/icons-material";
import { FormLabel } from "@mui/material";

export const theme = createTheme({
  palette: {
    purpleBlue: {
      main: "#6574D8",
      light: "#8A9BD8",
      dark: "#6574D8",
      contrastText: "#ffffff",
    },
    purpleBlueLight: {
      main: "#8A9BD8",
      light: "#8A9BD8",
      dark: "#6574D8",
      contrastText: "#ffffff",
    },
    crimson: {
      main: "#FF2D55",
      light: "#FFC0CC",
      dark: "#FF2D55",
      contrastText: "#ffffff",
    },
    successGreen: {
      main: "#34C759",
      light: "#ACFFC1",
      dark: "#34C759",
      contrastText: "#ffffff",
    },
    golden: {
      main: "#FC0",
      light: "#FFF8DE",
      dark: "#FC0",
      contrastText: "#ffffff",
    },
    blue: {
      main: "#007AFF",
      light: "#DBE7FF",
      dark: "#007AFF",
      contrastText: "#ffffff",
    },
    greyLight: {
      main: "#E5E7EB",
      light: "#E5E7EB",
      dark: "#706F7C",
      contrastText: "#000000",
    },
    aqua: {
      main: "#00988F",
      light: "#00988F",
      dark: "#00988F",
      contrastText: "#ffffff",
    },
    darkOrange: {
      main: "#FF9500",
      light: "#FFF0DB",
      dark: "#FF9500",
      contrastText: "#ffffff",
    },
    seaBlue: {
      main: "#30B0C7",
      light: "#D4F9FF",
      dark: "#30B0C7",
      contrastText: "#ffffff",
    },
    darkBlue: {
      main: "#1C274C",
      light: "#1C274C",
      dark: "#1C274C",
      contrastText: "#ffffff",
    },
    purpleGrey: {
      main: "#A2A2C2",
      light: "#A2A2C2",
      dark: "#A2A2C2",
      contrastText: "#ffffff",
    },
    green: {
      main: "#04B87B",
      light: "#E6FBF4",
      dark: "#04B87B",
      contrastText: "#ffffff",
    },
    grey: {
      main: "#706F7C",
      light: "#DFDFDF",
      dark: "#706F7C",
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
      sm2: "1.5rem",
      md: "1.75rem",
      lg: "2.5rem",
    },
    color: {
      purpleBlue: "#6574D8",
      darkBlue: "#1F2937",
      mediumaquamarine: "#89CCB5",
      aqua: "#00988F",
      lightGrey: "#AEB2BA",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "inherit",
          fontFamily: "Poppins, Rubik, sans-serif",
          fontWeight: "500",
        },
      },
    },
  },
  custom: {
    sidebarOpenWidth: SIDEBAR_OPEN_WIDTH,
    spacing: {
      x4s: 3,
      x3s: 5,
      xxs2: 8,
      xxs: 10,
      xs2: 12,
      xs: 14,
      sm: 20,
      md2: 27,
      md: 30,
      lg: 40,
      xlg: 57,
    },
  },
});

export const Root = styled("div")(({ theme }) => ({
  width: "100%",
  "& *": { fontFamily: "Poppins, Rubik, sans-serif" },
  maxWidth: `calc(100vw - ${
    theme.custom.sidebarOpenWidth + 32 + theme.custom.spacing.sm
  }px)`,
  fontWeight: "500",
  "& *": { fontWeight: "500" },
  fontFamily: "Poppins, Rubik, Roboto, sans-serif !important",
  "& *": {
    fontFamily: "Poppins, Rubik, Roboto, sans-serif !important",
  },
  "& *::-webkit-scrollbar": {
    width: "12px",
  },
  "& *::-webkit-scrollbar-track": {
    borderRadius: "6px",
    backgroundColor: "#b8c2ff",
  },
  "& *::-webkit-scrollbar-thumb": {
    borderRadius: "8px",
    border: "4px solid transparent",
    backgroundClip: "content-box",
    backgroundColor: "#fff",
  },
  "& .flex": {
    display: "flex",
  },
  "& .flex-col": {
    flexDirection: "column",
  },
  "& .flex-row": {
    flexDirection: "row",
  },
  "& .flex-grow": {
    flexGrow: 1,
  },
  "& .flex-grow-2": {
    flexGrow: 2,
  },
  "& .flex-wrap": {
    flexWrap: "wrap",
  },
  "& .items-start": {
    alignItems: "start",
  },
  "& .items-center": {
    alignItems: "center",
  },
  "& .items-end": {
    alignItems: "end",
  },
  "& .items-stretch": {
    alignItems: "stretch",
  },
  "& .justify-center": {
    justifyContent: "center",
  },
  "& .justify-between": {
    justifyContent: "space-between",
  },
  "& .justify-around": {
    justifyContent: "space-around",
  },
  "& .justify-end": {
    justifyContent: "flex-end",
  },
  "& .align-self-start": {
    alignSelf: "start",
  },
  "& .align-self-end": {
    alignSelf: "end",
  },
  "& .justify-self-start": {
    justifySelf: "start",
  },
  "& .justify-self-end": {
    justifySelf: "end",
  },
  "& .gap-x4s": {
    gap: theme.custom.spacing.x4s,
  },
  "& .gap-x3s": {
    gap: theme.custom.spacing.x3s,
  },
  "& .gap-xxs2": {
    gap: theme.custom.spacing.xxs2,
  },
  "& .gap-xxs": {
    gap: theme.custom.spacing.xxs,
  },
  "& .gap-xs": {
    gap: theme.custom.spacing.xs,
  },
  "& .gap-xs2": {
    gap: theme.custom.spacing.xs2,
  },
  "& .gap-sm": {
    gap: theme.custom.spacing.sm,
  },
  "& .gap-md": {
    gap: theme.custom.spacing.md,
  },
  "& .gap-lg": {
    gap: theme.custom.spacing.lg,
  },
  "& .full-height": {
    height: "100%",
  },
  "& .full-width": {
    width: "100%",
  },
  "& .grid": {
    display: "grid",
  },
  "& .grid-cols-2": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "& .col-start-1": {
    gridColumnStart: "1",
  },
  "& .col-end-2": {
    gridColumnEnd: "2",
  },
  "& .col-start-2": {
    gridColumnStart: "2",
  },
  "& .col-end-3": {
    gridColumnEnd: "3",
  },
  "& .p-xxs2": {
    padding: theme.custom.spacing.xxs2,
  },
  "& .p-r-xxs2": {
    paddingRight: theme.custom.spacing.xxs2,
  },
  "& .p-l-xxs2": {
    paddingLeft: theme.custom.spacing.xxs2,
  },
  "& .p-d-xxs2": {
    paddingDown: theme.custom.spacing.xxs2,
  },
  "& .p-t-xxs2": {
    paddingTop: theme.custom.spacing.xxs2,
  },
  "& .link": {
    textDecoration: "none",
    // color: theme.typography.color.purpleBlue,
    color: "inherit",
  },
  "& .cursor-pointer": { cursor: "pointer" },
}));

export const Main = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "36px",
}));

export const ContentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const Title = styled(Typography)(
  ({ theme, color, fontWeight, fontSize }) => ({
    margin: "0",
    color: color ? color : theme.typography.color.darkBlue,
    // fontSize: fontSize ? fontSize : theme.typography.fontSize.md,
    fontSize: "1.375rem",
    fontWeight: fontWeight ? fontWeight : "1000",
  })
);

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.typography.color.darkBlue,
  fontWeight: "600",
  font: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
}));

export const selectStyles = ({ theme }) => ({
  minHeight: "50px",
  borderRadius: "8px",
  // border: "3px solid #E5E7EB !important",
  // boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
  "& .MuiListItemText-root": { margin: "0" },
  "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "12px 32px 12px 12px",
  },
  "& .MuiSelect-icon": {
    top: "calc(50% - 11px)",
    color: theme.typography.color.darkBlue,
  },
});

export const selectStylesV2 = ({ theme }) => ({
  minHeight: "43px",
  "& .MuiListItemText-root": {
    margin: "0",
    height: "25px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
    padding: "0px 32px 0px 12px",
  },
  "& .MuiSelect-icon": {
    top: "calc(50% - 11px)",
    color: "#9CA3AF",
  },
});

export const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 8,
    position: "relative",
    border: "1px solid #E5E7EB",
    padding: "12px 32px 12px 12px",
    boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      // border: "1px solid #E5E7EB",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export const InputBaseStyledV2 = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "10px !important",
    position: "relative",
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    padding: "8px 32px 8px 12px",
    // boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
    "&:focus": {
      border: "1px solid #E5E7EB",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

// export const textFieldStyles = ({ theme }) => ({
//   fontSize: theme.typography.fontSize.xs,
//   lineHeight: theme.typography.fontSize.md,
//   color: "inherit",
//   "& .MuiInputBase-root": {
//     minHeight: "50px",
//     borderRadius: "8px",
//     ".MuiInputBase-input": {
//       padding: "12px",
//       "::placeholder": { color: "#D1D5DB", opacity: "1" },
//     },
//     ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
//       {
//         border: "1px solid #E5E7EB !important",
//         boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
//       },
//   },
//   "& .MuiFormHelperText-root": {
//     color: "crimson",
//     fontSize: ".8rem",
//     margin: "2px 0 -10px 12px",
//   },
// });

export const SelectStyled = styled(Select)(({ theme }) => ({
  fontFamily: "inherit",
  fontSize: theme.typography.fontSize.sm,
  lineHeight: theme.typography.fontSize.sm,
  color: theme.palette.darkBlue.main,
  display: "flex",
  alignItems: "center",
  "& .MuiSelect-select.MuiInputBase-input": {
    fontSize: "1rem",
    padding: "0",
    paddingLeft: theme.custom.spacing.xxs2,
    paddingRight: theme.custom.spacing.x3s,
    display: "flex",
    alignItems: "center",
    width: "min-content",
    minHeight: theme.typography.fontSize.sm,
    height: "100%",
  },
  "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
    paddingRight: theme.custom.spacing.x3s,
  },
  "& .MuiSelect-icon": {
    position: "static",
    width: theme.typography.fontSize.sm,
    height: "auto",
    color: "#9CA3AF",
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "none",
    },
}));

export const SelectStyledOld = styled(Select)(({ theme }) => ({
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

export const ButtonStyled = styled(Button)(({ theme }) => ({
  minWidth: "10px",
  borderRadius: theme.shape.borderRadius,
  font: "inherit",
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.xs,
  padding: "8px",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
  svg: {
    // width: "20px",
    height: "auto",
  },
}));

export const FormControlStyled = styled(FormControl)(({ theme }) => ({
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
}));

export const textFieldStyles = ({ theme }) => ({
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root": {
    minHeight: "50px",
    borderRadius: "8px",
    ".MuiInputBase-input": {
      padding: "12px",
      "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
    ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #E5E7EB !important",
        boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
      },
  },
  "& .MuiFormHelperText-root": {
    color: "crimson",
    fontSize: ".8rem",
    margin: "2px 0 -10px 12px",
  },
});

export const muiTelInputStyles = ({ theme }) => ({
  ...textFieldStyles({ theme }),
  "& .MuiButtonBase-root.MuiIconButton-root": {
    // backgroundColor: "red !important",
  },
  "& .MuiInputBase-root .MuiInputBase-input": {
    paddingLeft: "0",
  },
});

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root": {
    minHeight: "50px",
    borderRadius: "8px",
    ".MuiInputBase-input": {
      padding: "12px",
      "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
    ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #E5E7EB !important",
        boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
      },
  },
  "& .MuiFormHelperText-root": {
    color: "crimson",
    fontSize: ".8rem",
    margin: "2px 0 -10px 12px",
  },
}));

export const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: theme.typography.fontSize.md,
  color: "inherit",
  "& .MuiInputBase-root": {
    minHeight: "50px",
    padding: "0",
    ".MuiInputBase-input": {
      fontFamily: "inherit",
      padding: "12px",
    },
    ".MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #E5E7EB !important",
        boxShadow: "0px 1px 2px 0px rgba(31, 41, 55, 0.08) !important",
      },
  },
  "& .MuiSvgIcon-root": {
    width: theme.custom.spacing.sm,
    height: "auto",
  },
  "& .MuiAutocomplete-endAdornment": {
    // top: "10px !important",
  },
}));

export const AutocompleteField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    ".MuiInputBase-input": {
      padding: "12px",
      "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: ".8rem",
    margin: "2px 0 -10px 12px",
  },
}));

export const AutocompleteStyledV2 = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputBase-root": {
    minWidth: "180px",
    minHeight: "43px",
    maxHeight: "43px",
    padding: "0",
    backgroundColor: "#fff",
    borderRadius: "10px",
    "& .MuiInputBase-input": {
      padding: "8px 0px 8px 12px",
      "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
    "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #E5E7EB !important",
      },
  },
  "& .MuiSvgIcon-root": {
    width: theme.custom.spacing.sm,
    height: "auto",
  },
  "& .MuiAutocomplete-endAdornment": {
    // top: "10px !important",
  },
  "& .MuiFormHelperText-root": {
    fontSize: ".8rem",
    margin: "2px 0 -10px 12px",
  },
}));

export const AutocompleteFieldV2 = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    "& .MuiInputBase-input": {
      padding: "8px 0px 8px 12px",
      "::placeholder": { color: "#D1D5DB", opacity: "1" },
    },
    "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #E5E7EB !important",
      },
  },
}));

export const AutocompleteMenuProps = {
  sx: {
    maxHeight: "350px",
    minWidth: "240px",
    marginTop: "10px",
    boxShadow:
      "0px 2px 4px 0px rgba(31, 41, 55, 0.06), 0px 4px 6px 0px rgba(31, 41, 55, 0.10)",
    "& .MuiAutocomplete-listbox": {
      padding: "8px",
      ".MuiAutocomplete-option": {
        padding: "8px",
        borderRadius: "4px",
      },
    },
  },
};

export const customMenuProps = {
  // onClick: (e) => e.stopPropagation(),
  // MenuListProps: {
  //   onClik: (e) => e.stopPropagation(),
  // },
  sx: {
    maxHeight: "350px",
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

export const MenuStyled = styled((props) => (
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
        ".MuiTypography-root": { fontSize: "14px", lineHeight: "20px" },
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
export const FormLabelStyled = styled(FormLabel)(({ theme }) => ({
  padding: "0",
  color: theme.typography.color.darkBlue,
  fontSize: theme.typography.fontSize.xs,
  lineHeight: "normal",
  paddingBottom: "12px",
  letterSpacing: "0.32px",
  fontWeight: "600",
}));
export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: "0 8px 0 0",
  // color: "grey",
  // "&.Mui-checked": {
  //   color: "grey",
  // },
  "&:hover": {
    backgroundColor: "transparent", // remove hover background color
  },
}));
