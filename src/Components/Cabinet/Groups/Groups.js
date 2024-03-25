import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  FONT_BLUE_DARK,
  FONT_SM,
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
    gap: `${SPACING_SM}px`,
  },
  "& .gap-md": {
    gap: `${SPACING_SM}px`,
  },
  "& .full-width": {
    width: "100%",
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
  fontSize: "2.5rem",
  fontWeight: "1000",
});

const InputLabelStyled = styled(InputLabel)({
  color: FONT_BLUE_DARK,
  fontWeight: "600",
  font: "inherit",
  fontSize: `${FONT_SM}`,
});

const SelectStyled = styled(Select)({
  width: "auto",
  backgroundColor: "white",
  borderRadius: "12px",
  font: "inherit",
  fontSize: `${FONT_SM}`,
  color: `${FONT_BLUE_DARK}`,
  "& .MuiSelect-select": {
    padding: "15px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:focus .MuiOutlinedInput-notchedOutline":
    {
      border: "2px solid #E5E5E5 !important",
    },
});

const Groups = () => {
  return (
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
          </div>
        </Header>
      </Main>
    </Root>
  );
};

export default Groups;
