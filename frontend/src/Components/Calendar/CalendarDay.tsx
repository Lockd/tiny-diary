import React from "react";
import styles from "./Calendar.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface ICalendarDayProps {
  year: number;
  month: number;
  day: number;
  isCurrentDay: boolean;
}

const MOOD_TO_COLOR: { [key: string]: string } = {
  "-2": "Red",
  "-1": "Yellow",
  "0": "Blue",
  "1": "Purple",
  "2": "Green",
};

const CalendarDay: React.FC<ICalendarDayProps> = ({
  day,
  year,
  month,
  isCurrentDay,
}) => {
  const mood = useAppSelector(
    (state) => state.diary?.[year]?.[month + 1]?.[day + 1]?.mood
  );
  const blocks = useAppSelector(
    (state) => state.diary?.[year]?.[month + 1]?.[day + 1]?.blocks
  );

  let containerClassName = styles.calendarDay;
  if (mood !== undefined) {
    // mood is filled in
    containerClassName += ` ${
      styles[`calendarDay${MOOD_TO_COLOR[mood.toString()]}`]
    }`;
  } else if (blocks) {
    // no mood, but diary entry
    containerClassName += " " + styles.calendarDayOutline;
  } else if (isCurrentDay) {
    // no data, but it is current day
    containerClassName += " " + styles.calendarDayCurrent;
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
