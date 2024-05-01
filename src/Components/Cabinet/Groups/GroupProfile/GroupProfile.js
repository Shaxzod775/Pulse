import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ButtonStyled,
  InputBaseStyledV2,
  Main,
  Root,
  Title,
  customMenuProps,
  selectStylesV2,
  theme,
} from "../../CabinetStyles";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../../../Assets/Icons/icons";
import {
  Button,
  Card,
  Chip,
  Grid,
  Divider,
  InputBase,
  Paper,
  ThemeProvider,
  Typography,
  keyframes,
  styled,
  IconButton,
  Dialog,
  Box,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import * as routes from "../../../../Constants/routes";
import Dropzone from "react-dropzone";
import { NumericFormat } from "react-number-format";
import { Height, RouteSharp } from "@mui/icons-material";
import { CardStyled, InfoWithIcon } from "../../GridItemCardStyles";
import { TypographyStyled } from "../../CabinetStyles";
import groupImage from "../../../../Assets/Images/Group.png";
import useInput from "../../../../hooks/useInput";

const headerItemStyles = ({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
});

const DialogButton = styled(Button)(({ theme, variant, color }) => ({
  minHeight: "44px",
  minWidth: "150px",
  borderRadius: theme.custom.spacing.xxs,
  border:
    variant === "contained"
      ? `1px solid ${theme.palette[color].main}`
      : variant === "text"
      ? "1px solid transparent"
      : "",
  padding: "10px 30px",
  font: "inherit",
  fontWeight: "400",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
}));

const InfoLine = styled("div")(({ theme, small }) => ({
  display: "flex",
  alignItems: "center",
  gap: small ? "3px" : "5px",
  fontSize: small ? ".75rem" : "inherit",
  "& svg": {
    minWidth: "20px",
    width: small ? "20px" : "24px",
    height: "auto",
  },
}));

const CardText = styled(Typography)(
  ({
    theme,
    fontFamily = "Poppins, Rubik, sans-serif",
    fontSize = "18px",
  }) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    lineHeight: "normal",
  })
);

const ProfileTabHeader = styled("div")(
  ({
    theme,
    active,
    fontWeight = 500,
    fontSize = "1.125rem",
    fontFamily = "inherit",
  }) => ({
    color: active ? "#1C0D64" : "#AEB2BA",
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontWeight,
    lineHeight: "150%",
    position: "relative",
    transition: "all 0.3s ease-in-out",
    cursor: active ? "" : "pointer",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: active ? "0%" : "50%",
      right: active ? "0%" : "50%",
      bottom: "-14px",
      height: "2px",
      backgroundColor: "#6574D8",
      transition: "all .3s ease-in-out",
    },
    "&:hover": { opacity: active ? "" : ".5" },
  })
);

const InfoItem = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  lineHeight: "150%",
  fontFamily: "Poppins, Rubik, sans-serif",
  "& > h5": {
    margin: "0",
    color: "#AEB2BA",
    fontSize: "1.125rem",
    fontWeight: "500",
    letterSpacing: ".36px",
  },
  "& > span": {
    color: "#1C0D64",
    fontSize: "1rem",
    letterSpacing: ".32px",
  },
  // svg: { color: theme.typography.color.purpleBlue },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 12px",
  "& .MuiChip-label": { padding: "0" },
}));

const PaymentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 10px",
  boxShadow: "none",
  width: "100%",
  color: "#6574D8",
  backgroundColor: "#EEF0FF",
}));

const PaymentInfoLine = styled("div")(({ theme }) => ({
  color: "inherit",
  display: "flex",
  gap: "8px",
  "& svg": {
    minWidth: "24px",
    height: "auto",
  },
  "& span": {
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
    letterSpacing: "0.32px",
    whiteSpace: "nowrap",
  },
}));

const GroupProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedGroup, changeSelectedGroup] = useInput("0");
  const tabsToMap = [
    "Посещаемость",
    "Материалы",
    "Цены со скидкой",
    "Экзамены",
    "История",
    "Комментарии",
  ];

  const goBack = () => {
    navigate(-1); // This navigates one step back in history
  };

  const attendanceContent = useMemo(
    () => (
      <Box>
        <Box className="flex justify-between" paddingX="20px">
          <Box display="flex" columnGap="14px">
            <Box className="flex items-center" columnGap="10px" padding="10px">
              <Icons.UserCheckRounded color="#1C0D64" />
              <TypographyStyled
                fontSize="1.125rem"
                fontWeight="600"
                color="#1C0D64"
              >
                Посещаемость
              </TypographyStyled>
            </Box>
            <ButtonStyled sx={{ padding: "10px" }} color="purpleBlue">
              <Box className="flex items-center" columnGap="10px">
                <Icons.Group />
                <Typography fontSize="0.875rem">222</Typography>
              </Box>
            </ButtonStyled>
          </Box>
          <Box className="flex items-center">
            <Select
              required
              value={selectedGroup}
              onChange={changeSelectedGroup}
              MenuProps={customMenuProps}
              sx={selectStylesV2({ theme })}
              input={<InputBaseStyledV2 />}
              IconComponent={Icons.ArrowDBold}
            >
              <MenuItem value="0">
                <ListItemText>По А-Я</ListItemText>
              </MenuItem>
              {["По Я-А", "Sort by", "Sort by"].map((group, i) => (
                <MenuItem key={group} value={group}>
                  <ListItemText primary={group} />
                </MenuItem>
              ))}
            </Select>
            <ButtonStyled
              sx={{ borderRadius: "50px", padding: "8px 20px" }}
              color="purpleBlue"
            >
              <Box className="flex items-center" columnGap="10px">
                <Icons.CalendarContained />
                <Typography fontSize="1.125rem" fontWeight="600">
                  2-6 Апреля 2024
                </Typography>
              </Box>
            </ButtonStyled>
            <Box className="flex items-center" columnGap="4px">
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                sx={{
                  borderRadius: "50%",
                }}
              >
                <Icons.ArrowDBold style={{ transform: "rotate(90deg)" }} />
              </ButtonStyled>
              <ButtonStyled
                variant="contained"
                color="purpleBlue"
                sx={{
                  borderRadius: "50%",
                }}
              >
                <Icons.ArrowDBold style={{ transform: "rotate(270deg)" }} />
              </ButtonStyled>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
    []
  );

  const groupsContent = useMemo(
    () => <div className="flex flex-wrap gap-lg"></div>,
    []
  );

  const emptyElement = <></>;
  const tabContents = useMemo(
    () => [attendanceContent, groupsContent, emptyElement, emptyElement],
    [attendanceContent]
  );

  return (
    <Root sx={{ height: "100%" }}>
      <Main className="full-height">
        <div className="flex items-stretch justify-between">
          <div className="flex items-center gap-md">
            <ButtonStyled
              variant="outlined"
              sx={headerItemStyles}
              color="grey"
              onClick={goBack}
            >
              <Icons.ArrowL />
            </ButtonStyled>
            <div className="flex flex-col">
              <Title>Профиль группы</Title>
              <div className="flex items-center gap-x3s">
                <Link to={routes.CABINET + routes.GROUPS} className="link">
                  <Typography fontSize="0.75rem">Группы</Typography>
                </Link>
                <Icons.ArrowL
                  width="1rem"
                  style={{ transform: "rotate(180deg)" }}
                />
                <Typography fontSize="0.75rem">Профиль группы</Typography>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-sm">
            <DialogButton variant="contained" color="purpleBlue">
              <Typography>Изменить группу</Typography>
            </DialogButton>
          </div>
        </div>
        <Paper
          sx={{
            height: "100%",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "none",
          }}
        >
          <Box className="flex" columnGap="24px" width="100%" height="100%">
            <Box className="flex flex-col" height="fit-content" rowGap="22px">
              <CardStyled
                sx={{
                  minWidth: "360px",
                  maxWidth: "360px",
                  padding: "12px",
                  border: "1px solid #E5E7EB",
                }}
              >
                <Box className="flex flex-col" rowGap="22px">
                  <img
                    src={groupImage}
                    alt="Group"
                    width={"100%"}
                    height={180}
                    style={{
                      borderRadius: "14px",
                      border: "1px solid #E5E7EB",
                    }}
                  />
                  <Box className="flex flex-col" rowGap="24px">
                    <Box className="flex justify-between">
                      <Box className="flex flex-col" rowGap="2px">
                        <TypographyStyled fontSize="1.125rem" fontWeight="600">
                          GR011-64
                        </TypographyStyled>
                        <TypographyStyled
                          fontSize="0.75rem"
                          color="lightGray"
                          fontWeight="400"
                        >
                          Frontend
                        </TypographyStyled>
                      </Box>
                      <Box>
                        <Link
                          to={routes.CABINET + routes.TEACHERS + routes.PROFILE}
                        >
                          <ButtonStyled
                            color="grayLight"
                            variant="contained"
                            sx={{
                              borderRadius: "40px",
                              padding: "4px 10px",
                            }}
                          >
                            <TypographyStyled
                              color="inherit"
                              fontSize="0.75rem"
                            >
                              Koptleulov Arslan
                            </TypographyStyled>
                          </ButtonStyled>
                        </Link>
                      </Box>
                    </Box>
                    <Box className="flex flex-col" rowGap="12px">
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CalendarContained />
                          <TypographyStyled>Дата начала</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>20.03.2024</TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.ClockDashed />
                          <TypographyStyled>Дата завершения</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>21.06.2024</TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CalendarDateContained />
                          <TypographyStyled>Дни урока</TypographyStyled>
                        </InfoWithIcon>
                        <Box className="flex items-center" columnGap="10px">
                          <TypographyStyled small>Пн, Ср, Чт</TypographyStyled>
                          <Icons.Circle
                            color="#A1A7B2"
                            width="4px"
                          ></Icons.Circle>
                          <TypographyStyled small>14:00</TypographyStyled>
                        </Box>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.Door />
                          <TypographyStyled>Кабинет</TypographyStyled>
                        </InfoWithIcon>
                        <Box className="flex items-center" columnGap="10px">
                          <TypographyStyled small>1</TypographyStyled>
                          <Icons.Circle
                            color="#A1A7B2"
                            width="4px"
                          ></Icons.Circle>
                          <TypographyStyled small>1</TypographyStyled>
                        </Box>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.Location />
                          <TypographyStyled>Филиал</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled small>
                          IT Park Tashkent
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.CardSend />
                          <TypographyStyled>Прибыль группы</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled
                          color={theme.typography.color.greenSuccess}
                          small
                        >
                          <NumericFormat
                            value={5000000}
                            displayType="text" // Set to "input" if you want an input field
                            thousandSeparator=" "
                          />{" "}
                          UZS
                        </TypographyStyled>
                      </Box>
                      <Box className="flex justify-between items-center">
                        <InfoWithIcon>
                          <Icons.BillCross />
                          <TypographyStyled>Долг группы</TypographyStyled>
                        </InfoWithIcon>
                        <TypographyStyled
                          color={theme.typography.color.redError}
                          small
                        >
                          <NumericFormat
                            value={-5000000}
                            displayType="text" // Set to "input" if you want an input field
                            thousandSeparator=" "
                          />{" "}
                          UZS
                        </TypographyStyled>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardStyled>
              <ButtonStyled
                variant="contained"
                color="purpleBlueLight"
                sx={{
                  cursor: "default",
                  borderRadius: "50px",
                  padding: "10px",
                }}
              >
                <Box className="flex items-center" columnGap="10px">
                  <Icons.Wallet />
                  <Typography>
                    <NumericFormat
                      value={1212000}
                      displayType="text" // Set to "input" if you want an input field
                      thousandSeparator=" "
                    />{" "}
                    UZS
                  </Typography>
                </Box>
              </ButtonStyled>
            </Box>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                boxShadow: "none",
                borderRadius: "20px",
                border: "1px solid #E5E7EB",
              }}
            >
              <Box className="flex flex-col" rowGap="20px">
                <Box
                  className="flex"
                  columnGap="12px"
                  paddingX="20px"
                  paddingTop="20px"
                >
                  {tabsToMap.map((tab, i) => (
                    <>
                      <ButtonStyled
                        variant={activeTab === i ? "contained" : "text"}
                        color="purpleBlueLight"
                        active={activeTab === i}
                        onClick={() => setActiveTab(i)}
                        key={i}
                        sx={{
                          minWidth: "unset",
                          fontSize: "1.125rem",
                          lineHeight: "150%",
                          padding: "11px 10px",
                          borderRadius: "10px",
                        }}
                      >
                        {tab}
                      </ButtonStyled>
                      {i < tabsToMap.length - 1 && (
                        <div className="flex justify-between items-center">
                          <Icons.DividerDot height="6px" color="#D1D5DB" />
                        </div>

                        // <Divider orientation="vertical" flexItem />
                      )}
                    </>
                  ))}
                </Box>
                {tabContents[activeTab]}
              </Box>
            </Paper>
          </Box>
        </Paper>
      </Main>
    </Root>
  );
};

export default GroupProfile;
