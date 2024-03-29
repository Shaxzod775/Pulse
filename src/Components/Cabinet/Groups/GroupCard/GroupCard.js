import React from "react";
import { Button, Card, CardActions, CardContent, styled } from "@mui/material";
import { Icons } from "../../../../Assets/Icons/icons";
import { theme, CardStyled, Title } from "../../Cabinet";

const CardTag = styled("span")(({ theme, color = "orange" }) => ({
  borderRadius: theme.custom.spacing.xs,
  paddingTop: theme.custom.spacing.x3s,
  paddingBottom: theme.custom.spacing.x3s,
  paddingRight: theme.custom.spacing.xxs,
  paddingLeft: theme.custom.spacing.xxs,
  backgroundColor: theme.palette[color].light,
  color: theme.palette[color].main,
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
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const GroupCard = ({ info = { state: "archive" } }) => {
  console.log(info);
  const tags = [
    { color: "green", text: "Активна" },
    { color: "orange", text: "Набор" },
    { color: "grey", text: "Архив" },
  ];

  const getTagInfo = (item) => {
    const state = info.state;
    return state === "active"
      ? tags[0][item]
      : state === "collection"
      ? tags[1][item]
      : state === "archive"
      ? tags[2][item]
      : tags[2][item];
  };
  return (
    <CardStyled>
      <CardContent
        sx={{
          padding: 0,
          paddingBottom: `${theme.custom.spacing.md2}px`,
          color: theme.typography.color.darkBlue,
        }}
      >
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <Title
              sx={{
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              GR011-62
            </Title>
            <CardTag color={getTagInfo("color")}>{getTagInfo("text")}</CardTag>
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
          <div className="flex flex-col gap-xs">
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
        <CardButton variant="contained" color="purpleGrey">
          <Icons.Edit />
          <span>Редактировать</span>
        </CardButton>
      </CardActions>
    </CardStyled>
  );
};

export default GroupCard;
