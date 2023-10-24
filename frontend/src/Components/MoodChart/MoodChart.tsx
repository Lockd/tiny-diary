import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useAppSelector } from "../../app/hooks";
import { MOOD_BORDERS } from "../../utils/constants";
import styles from "./MoodChart.module.scss";
import { getMonthName } from "../../utils/dateUtils";
import CustomAxisTick from "./CustomAxisTick";
import CustomToolTip from "./CustomTooltip";

interface IMoodChartProps {
  year: number;
  month: number;
  amountOfDays: number;
}

interface IMoodDataUnit {
  name: string;
  mood: number | null;
}

const MoodChart: React.FC<IMoodChartProps> = ({
  year,
  month,
  amountOfDays,
}) => {
  const [moodData, setMoodData] = useState<IMoodDataUnit[]>([]);
  const monthName = getMonthName(month);
  const monthDiary = useAppSelector(
    (state) => state.diary?.[year]?.[month + 1]
  );

  useEffect(() => {
    const data: IMoodDataUnit[] = [];

    for (let i = 1; i <= amountOfDays; i++) {
      const mood = monthDiary?.[i]?.mood ?? null;

      data.push({
        name: `${i}.${month + 1}.${year}`,
        mood,
      });
    }

    setMoodData(data);
  }, [monthDiary]);

  return (
    <div className={styles.moodGraph}>
      <h2 className={styles.moodGraphTitle}>Your mood for {monthName}</h2>
      <div className={styles.moodGraphWrapper}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={moodData}
            margin={{ top: 20, right: 20, left: -25, bottom: 5 }}
          >
            <XAxis
              dataKey="name"
              tick={false}
              label={{ value: "Days of the month", position: "center" }}
            />
            <YAxis
              dataKey="mood"
              domain={[MOOD_BORDERS.min, MOOD_BORDERS.max]}
              tick={<CustomAxisTick />}
            />
            <Tooltip content={<CustomToolTip />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#ff7300"
              yAxisId={0}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodChart;
