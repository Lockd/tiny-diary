import React, { useState } from "react";
import {
  getMonthIdxFromDate,
  getDaysInMonth,
  getYearFromDate,
  getMonthName,
  getDayOfTheWeek,
} from "../../utils/dateUtils";
import CalendarMonth from "./CalendarMonth";
import styles from "./Calendar.module.scss";

const CalendarManager: React.FC<any> = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonthIdxFromDate(new Date())
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    getYearFromDate(new Date())
  );

  const monthName = getMonthName(selectedMonth);

  const onReduceMonth = () => {
    if (selectedMonth - 1 < 0) {
      setSelectedMonth(11);
      setSelectedYear((prevState) => prevState - 1);
      return;
    }

    setSelectedMonth((prevState) => prevState - 1);
  };

  const onIncreaseMonth = () => {
    if (selectedMonth + 1 > 11) {
      setSelectedMonth(0);
      setSelectedYear((prevState) => prevState + 1);
      return;
    }

    setSelectedMonth((prevState) => prevState + 1);
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarControls}>
        <button onClick={onReduceMonth} className={styles.calendarButton}>
          {"<"}
        </button>
        <h2 className={styles.monthTitle}>
          {monthName} of {selectedYear}
        </h2>
        <button onClick={onIncreaseMonth} className={styles.calendarButton}>
          {">"}
        </button>
      </div>
      <div className={styles.monthsWrapper}>
        <CalendarMonth
          dayOfTheWeekForFirstDay={getDayOfTheWeek(
            new Date(selectedYear, selectedMonth, 0)
          )}
          amountOfDays={getDaysInMonth(selectedMonth, selectedYear)}
        />
      </div>
    </div>
  );
};

export default CalendarManager;
