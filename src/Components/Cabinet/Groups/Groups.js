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
import GroupCard from "./GroupCard/GroupCard";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  InputLabelStyled,
  Main,
  Root,
  SelectStyled,
  Title,
} from "../Cabinet";

const Groups = () => {
  return (
    <Root>
      <Main>
        <ContentHeader>
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
        </ContentHeader>
        <Grid
          container
          justifyContent="center"
          spacing={`${theme.custom.spacing.sm}px`}
          marginBottom={`${theme.custom.spacing.sm}px`}
        >
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "collection" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "active" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "collection" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "archive" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "collection" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "archive" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "active" }} />
          </Grid>
          <Grid item xs="auto" md="auto" lg={3}>
            <GroupCard info={{ state: "collection" }} />
          </Grid>
        </Grid>
      </Main>
    </Root>
  );
};

export default Groups;
