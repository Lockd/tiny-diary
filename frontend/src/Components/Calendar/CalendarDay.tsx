import React from "react";
import styles from "./Calendar.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface ICalendarDayProps {
  year: number;
  month: number;
  day: number;
}

const CalendarDay: React.FC<ICalendarDayProps> = ({ day, year, month }) => {
  const hasData = useAppSelector(
    (state) => state.diary?.[year]?.[month + 1]?.[day + 1]
  );

  let containerClassName = styles.calendarDay;
  if (hasData) {
    containerClassName += " " + styles.calendarDayActive;
  }

  return (
    <Link to={`${year}/${month + 1}/${day + 1}`} className={containerClassName}>
      {day + 1}
    </Link>
  );
};

export default CalendarDay;
