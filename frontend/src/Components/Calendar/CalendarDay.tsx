import React from "react";
import styles from "./Calendar.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface ICalendarDayProps {
  year: number;
  month: number;
  day: number;
}

const MOOD_TO_COLOR: { [key: string]: string } = {
  "-2": "Red",
  "-1": "Yellow",
  "0": "Blue",
  "1": "Purple",
  "2": "Green",
};

const CalendarDay: React.FC<ICalendarDayProps> = ({ day, year, month }) => {
  const dayMood = useAppSelector(
    (state) => state.diary?.[year]?.[month + 1]?.[day + 1]?.mood
  );

  let containerClassName = styles.calendarDay;
  if (dayMood !== undefined) {
    containerClassName += ` ${
      styles[`calendarDay${MOOD_TO_COLOR[dayMood.toString()]}`]
    }`;
  }

  return (
    <Link
      to={`/${year}/${month + 1}/${day + 1}`}
      className={containerClassName}
    >
      {day + 1}
    </Link>
  );
};

export default CalendarDay;
