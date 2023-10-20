import React from "react";
import CalendarManager from "../../Components/Calendar/CalendarManager";
import { useParams, Navigate } from "react-router";
import {
  getMonthIdxFromDate,
  getYearFromDate,
  isMonthPresent,
  isYearPresent,
} from "../../utils/dateUtils";

const Calendar = () => {
  const { year, month } = useParams();

  const isMonth = isMonthPresent(month);
  const isYear = isYearPresent(year);

  if (!isMonth || !isYear) {
    const currentDate = new Date();
    const currentYear = getYearFromDate(currentDate);
    const currentMonth = getMonthIdxFromDate(currentDate);

    return <Navigate to={`/${currentYear}/${currentMonth}`} />;
  }

  return <CalendarManager year={year!} month={month!} />;
};

export default Calendar;
