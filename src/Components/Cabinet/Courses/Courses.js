import React from "react";
import { Button, Card, CardContent, Grid, styled } from "@mui/material";
import { Icons } from "../../../Assets/Icons/icons";
import {
  theme,
  ButtonStyled,
  ContentHeader,
  Main,
  Root,
  Title,
  CardStyled,
} from "../Cabinet";
import CourseCard from "./CourseCard/CourseCard";

const Courses = () => {
  return (
    <Root>
      <Main>
        <ContentHeader>
          <Title>Курсы</Title>
          <div className="flex items-center gap-sm">
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
    </Root>
  );
};

export default Courses;
