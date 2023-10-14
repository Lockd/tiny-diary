import React from "react";
import styles from "./Calendar.module.scss";
import { Link } from "react-router-dom";

interface ICalendarDayProps {
  year: number;
  month: number;
  day: number;
  hasData: boolean;
}

const CalendarDay: React.FC<ICalendarDayProps> = ({
  day,
  year,
  month,
  hasData,
}) => {
  return (
    <Link to={`${year}/${month + 1}/${day + 1}`} className={styles.calendarDay}>
      {day + 1}
    </Link>
  );
};

export default CalendarDay;
