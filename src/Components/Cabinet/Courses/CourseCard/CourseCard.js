import React from "react";
import { Button, CardContent, styled } from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled } from "../../Cabinet";

const CardButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.custom.spacing.xxs,
  font: "inherit",
  fontSize: theme.typography.fontSize.xs,
  padding: theme.custom.spacing.xxs,
  textTransform: "capitalize",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const EditButton = styled(CardButton)(({ theme }) => ({
  top: -theme.custom.spacing.xxs + 1.5,
  right: -theme.custom.spacing.xxs + 1.5,
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
    minWidth: `${theme.typography.fontSize.xs} !important`,
    height: `${theme.typography.fontSize.xs} !important`,
  },
}));

const CourseCard = ({ name, duration }) => {
  const lessonsInOneMonth = 12;
  const lessonLength = 2; // in hours
  const durationInHours = duration * lessonsInOneMonth * lessonLength;
  return (
    <CardStyled>
      <CardContent
        sx={{
          padding: 0,
          color: theme.typography.color.darkBlue,
          position: "relative",
          "&:last-child": {
            padding: 0,
          },
        }}
      >
        <div className="flex flex-col gap-md">
          <div className="flex flex-col justify-between">
            <EditButton
              color="grey"
              className="align-self-end"
              sx={{ maxWidth: "max-content" }}
            >
              <Icons.Edit />
              <span>Редактировать</span>
            </EditButton>
            <span>{name}</span>
          </div>
          <div className="flex flex-col gap-xxs">
            <div className="flex items-center gap-x4s">
              <Icons.Clock color="mediumaquamarine" />
              <span>{durationInHours} часов</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-x4s">
                <Icons.Notebook color="mediumaquamarine" />
                <span
                  style={{
                    fontSize: theme.typography.fontSize.xxs,
                  }}
                >
                  Программа курса
                </span>
              </div>
              <CardButton
                variant="contained"
                color="aqua"
                sx={{ borderRadius: "5px", padding: "5px" }}
              >
                Открыть
              </CardButton>
            </div>
          </div>
        </div>
      </CardContent>
    </CardStyled>
  );
};

export default CourseCard;
