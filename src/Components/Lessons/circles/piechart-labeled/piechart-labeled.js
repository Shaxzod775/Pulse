import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const configuration = {
  innerRadius: "60%",
  outerRadius: "100%",
  cornerRadius: 10,
  paddingAngle: 8,
  startAngle: -20,
  endAngle: 360,
  cy: "50%",
  cx: "50%",
};

const size = {
  width: 160,
  height: 160,
};

const StyledText = styled("text")(({ theme }) => ({
  // fill: theme.palette.text.primary,
  fill: "#b6b6b6",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 15,
  fontWeight: "bold",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const PiechartLabeled = ({ data, label }) => {
  return (
    <PieChart
      series={[
        {
          data,
          ...configuration,
        },
      ]}
      {...size}
      margin={{ right: 5 }}
      {...size}
    >
      <PieCenterLabel>{label}</PieCenterLabel>
    </PieChart>
  );
};

export default PiechartLabeled;
