import { getMonth, getYear, getDay, format } from "date-fns";

export const DAYS_OF_THE_WEEK = [
  {
    fullName: "Monday",
    shortName: "Mon",
    alias: "M",
  },
  {
    fullName: "Tuesday",
    shortName: "Tue",
    alias: "T",
  },
  {
    fullName: "Wednesday",
    shortName: "Wen",
    alias: "W",
  },
  {
    fullName: "Thursday",
    shortName: "Thu",
    alias: "T",
  },
  {
    fullName: "Friday",
    shortName: "Fri",
    alias: "F",
  },
  {
    fullName: "Saturday",
    shortName: "Sat",
    alias: "S",
  },
  {
    fullName: "Sunday",
    shortName: "Sun",
    alias: "S",
  },
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// TODO write unit tests for those functions

export const getDayMonthYear = (date: Date) => {
  return format(date, "dd.MM.yyyy").split(".");
};

export const getMonthIdxFromDate = (date: Date) => getMonth(date);

export const getYearFromDate = (date: Date) => getYear(date);

export const getMonthName = (idx: number) => MONTHS[idx];

export const getDayOfTheWeek = (date: Date) => getDay(date);

export const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

export const getYearsRange = (range: number) => {
  const currentYear = getYear(new Date());
  const years = [];

  for (let i = 0; i < range; i++) {
    years.push(currentYear + i);
  }

  return years;
};

export const isYearPresent = (year?: string) =>
  year && year?.length === 4 && !Number.isNaN(parseInt(year));

export const isDayPresent = (day?: string) =>
  day &&
  (day?.length === 2 || day?.length === 1) &&
  !Number.isNaN(parseInt(day));

export const isMonthPresent = (month?: string) =>
  month &&
  (month?.length === 2 || month?.length === 1) &&
  !Number.isNaN(parseInt(month));
