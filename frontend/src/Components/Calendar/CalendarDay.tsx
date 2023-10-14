import React from "react";
import styles from "./Calendar.module.scss";

interface ICalendarDayProps {
  day: number;
  hasData: boolean;
}

const CalendarDay: React.FC<ICalendarDayProps> = ({ day, hasData }) => {
  return (
    <div
      className={styles.calendarDay}
      onClick={() => console.log(`selected ${day} day`)}
    >
      {day + 1}
    </div>
  );
};

export default CalendarDay;
