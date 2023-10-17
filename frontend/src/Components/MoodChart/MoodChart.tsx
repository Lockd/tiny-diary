import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from "recharts";
import { useAppSelector } from "../../app/hooks";
import { MOOD_BORDERS } from "../../utils/constants";
import styles from "./MoodChart.module.scss";
import { getMonthName } from "../../utils/dateUtils";

interface MoodChart {
  year: number;
  month: number;
  amountOfDays: number;
}

const MoodChart: React.FC<MoodChart> = ({ year, month, amountOfDays }) => {
  // TODO get data for graph from the table
  const monthName = getMonthName(month);

  const generateMoodData = () => {
    const data = [];
    for (let i = 1; i <= amountOfDays; i++) {
      data.push({
        name: `${i}.${month + 1}.${year}`,
        mood: Math.floor(Math.random() * 5 - 2),
      });
    }
    return data;
  };

  return (
    <div className={styles.moodGraphWrapper}>
      <h2 className={styles.moodGraphTitle}>Your mood for {monthName}</h2>
      <LineChart
        width={600}
        height={200}
        data={generateMoodData()}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          tick={false}
          label={{ value: "Days of the month", angle: 0, position: "center" }}
        />
        <YAxis dataKey="mood" domain={[MOOD_BORDERS.min, MOOD_BORDERS.max]} />
        <Tooltip />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <Line type="monotone" dataKey="mood" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </div>
  );
};

export default MoodChart;
