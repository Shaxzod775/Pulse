import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  styled,
} from "@mui/material";
import {
  SPACING_SM,
  SIDEBAR_OPEN_WIDTH,
  SPACING_MD,
} from "../../../Constants/stylesConstants";
import { ArrowDownwardOutlined } from "@mui/icons-material";

const Root = styled("div")({
  width: `calc(100vw - ${SIDEBAR_OPEN_WIDTH + SPACING_SM * 2}px)`,
});

const Main = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: `${SPACING_MD}px`,
  "& .flex": {
    display: "flex",
  },
  "& .justify-between": {
    justifyContent: "space-between",
  },
  "& .gap-sm": {
    gap: `${SPACING_SM}px`,
  },
  "& .gap-md": {
    gap: `${SPACING_SM}px`,
  },
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Title = styled("h1")({
  margin: "0",
  color: "#1c274c",
  fontSize: "2.8rem",
  fontWeight: "1000",
});

const StyledSelect = styled(Select)({
  width: "100%",
  backgroundColor: "white",
  // padding: "15px",
  border: "2px solid #E5E5E5",
  borderRadius: "12px",
  fontSize: "28px",
  "& .MuiSelect-select": {
    padding: "15px",
  },
  "& *": {
    border: "none",
  },
});

const Groups = () => {
  return (
    <Root>
      <Main>
        <Header>
          <Title>Группы</Title>
          <div className="flex justify-between gap-sm">
            <FormControl fullWidth>
              <InputLabel htmlFor="teacher-select">Преподаватель</InputLabel>
              <StyledSelect
                // value={state.age}
                // onChange={handleChange}
                inputProps={{
                  name: "age",
                  id: "teacher-select",
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </StyledSelect>
            </FormControl>
            <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div>
          </div>
        </Header>
      </Main>
    </Root>
  );
};

export default Groups;
