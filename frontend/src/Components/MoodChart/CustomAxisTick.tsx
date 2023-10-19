import React from "react";
import { MOOD_MAPPING } from "../../utils/constants";

const CustomAxisTick: React.FC<any> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={8} textAnchor="end">
        {MOOD_MAPPING[payload.value]}
      </text>
    </g>
  );
};

export default CustomAxisTick;
