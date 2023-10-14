import React from "react";
import CalendarDay from "./CalendarDay";
import styles from "./Calendar.module.scss";
import { DAYS_OF_THE_WEEK } from "../../utils/dateUtils";

interface ICalendarMonthProps {
  amountOfDays: number;
  dayOfTheWeekForFirstDay: number;
  year: number;
  month: number;
}

const CalendarMonth: React.FC<ICalendarMonthProps> = ({
  amountOfDays,
  dayOfTheWeekForFirstDay,
  year,
  month,
}) => {
  const renderDays = () => {
    const days = [];

    for (const day of DAYS_OF_THE_WEEK) {
      days.push(
        <div key={day.fullName} className={styles.calendarDayName}>
          {day.alias}
        </div>
      );
    }

    // filling empty days to align the first day on the calendar
    for (let i = 0; i < dayOfTheWeekForFirstDay; i++) {
      days.push(<div key={`empty-day-${i}`}></div>);
    }

    for (let i = 0; i < amountOfDays; i++) {
      days.push(
        <CalendarDay
          key={i}
          day={i}
          hasData={false}
          year={year}
          month={month}
        />
      );
    }

    return <>{days.map((day) => day)}</>;
  };

  return (
    <div className={styles.monthContainer}>
      <div className={styles.calendarDaysContainer}>{renderDays()}</div>
    </div>
  );
};

export default CalendarMonth;
