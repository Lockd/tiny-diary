import React from "react";
import CalendarDay from "./CalendarDay";
import styles from "./Calendar.module.scss";
import { DAYS_OF_THE_WEEK, getDayMonthYear } from "../../utils/dateUtils";

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
  const [currentDay, currentMonth, currentYear] = getDayMonthYear(new Date());

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
      const isCurrentDay =
        currentDay === (i + 1).toString() &&
        currentYear === year.toString() &&
        currentMonth === (month + 1).toString();

      days.push(
        <CalendarDay
          key={i}
          day={i}
          year={year}
          month={month}
          isCurrentDay={isCurrentDay}
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
