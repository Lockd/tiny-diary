import React from "react";
import styles from "./MoodChart.module.scss";
import { getMoodIndicator } from "../MoodIndicator/MoodIndicator";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
  label?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  const date = payload[0]?.payload?.name;
  const value = payload[0]?.value;

  const indicator = getMoodIndicator(value, {});

  if (active && payload && payload.length > 0 && indicator && date) {
    return (
      <div className={styles.customTooltipContainer}>
        <p className={styles.customTooltipText}>
          {date}: {indicator}
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
