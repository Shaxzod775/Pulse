import { Box, Card, styled } from "@mui/material";

export const CardStyled = styled(Card)(({ theme }) => ({
  // "::before": {
  //   content: "'UNDER DEV'",
  //   color: "red",
  // },
  boxShadow: "none",
  height: "100%",
  padding: "5px",
  borderRadius: 20,
  backgroundColor: "#fff",
  // border: `1px solid ${theme.palette.grey[200]}`,
  "& img": {
    objectFit: "cover",
    objectPosition: "center",
    // borderRadius: "15px 15px 0px 0px",
  },
  // "& svg": {
  //   color: theme.typography.color.purpleBlue,
  // },
  fontSize: theme.typography.fontSize.xs,
  "& .font-xxs": {
    fontSize: ".75rem",
  },
}));

export const InfoWithIcon = styled("div")(
  ({ theme, small, iconColor = theme.typography.color.purpleBlue }) => ({
    display: "flex",
    alignItems: "center",
    fontWeight: small ? "" : "600",
    "& .MuiTypography-root": { fontWeight: small ? "" : "600" },
    gap: small ? "3px" : "5px",
    fontSize: small ? ".875rem" : "inherit",
    "& svg": {
      color: iconColor,
      width: small ? "20px" : "24px",
      height: "auto",
    },
    // "& svg": {
    //
    // },
  })
);
