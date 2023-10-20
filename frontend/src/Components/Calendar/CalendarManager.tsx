import React, { useState, useEffect } from "react";
import {
  getMonthIdxFromDate,
  getDaysInMonth,
  getYearFromDate,
  getDayOfTheWeek,
  MONTHS,
  getYearsRange,
} from "../../utils/dateUtils";
import CalendarMonth from "./CalendarMonth";
import styles from "./Calendar.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { db, auth } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TBackendDiaryEntry } from "../../types";
import { populateDiary } from "../../Features/Diary/diarySlice";
import MoodChart from "../MoodChart/MoodChart";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const CalendarManager: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonthIdxFromDate(new Date())
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    getYearFromDate(new Date())
  );
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const currentMonthDiary = useAppSelector(
    (state) => state.diary?.[selectedYear]?.[selectedMonth + 1]
  );

  const amountOfDays = getDaysInMonth(selectedMonth, selectedYear);
  const yearsRange = getYearsRange(3);

  useEffect(() => {
    // TODO download next and previous month if need
    // TODO virtualization
    fetchDocuments();
  }, [selectedMonth, selectedYear, uid]);

  const fetchDocuments = async () => {
    if (!uid || currentMonthDiary) return;

    const month = selectedMonth + 1 + "";
    const year = selectedYear + "";

    const monthCollection = collection(db, "users", uid, year);

    const monthQuery = query(
      monthCollection,
      where("year", "==", year),
      where("month", "==", month)
    );

    const monthDocuments = await getDocs(monthQuery);
    const documentsObject: { [key: string]: TBackendDiaryEntry } = {};
    monthDocuments.forEach((document) => {
      const docData = document.data() as TBackendDiaryEntry;
      documentsObject[docData.day] = docData;
    });

    dispatch(populateDiary({ month, year, entries: documentsObject }));
  };

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

  const onChangeMonth = (e: SelectChangeEvent<number>) => {
    if (typeof e.target.value === "number") {
      setSelectedMonth(e.target.value);
    }
  };

  const onChangeYear = (e: SelectChangeEvent<number>) => {
    if (typeof e.target.value === "number") {
      setSelectedYear(e.target.value);
    }
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarControls}>
        <Button onClick={onReduceMonth} className={styles.calendarButton}>
          {"<"}
        </Button>
        <div className={styles.dateSelectContainer}>
          <FormControl size="small">
            <InputLabel id="month-select" size="small">
              Month
            </InputLabel>
            <Select
              id="month-select"
              value={selectedMonth}
              label="Month"
              onChange={onChangeMonth}
            >
              {MONTHS.map((month, idx) => (
                <MenuItem value={idx} key={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="year-select" size="small">
              Year
            </InputLabel>
            <Select
              id="year-select"
              value={selectedYear}
              label="Year"
              onChange={onChangeYear}
            >
              {yearsRange.map((year) => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button onClick={onIncreaseMonth} className={styles.calendarButton}>
          {">"}
        </Button>
      </div>
      <div className={styles.monthsWrapper}>
        <CalendarMonth
          year={selectedYear}
          month={selectedMonth}
          dayOfTheWeekForFirstDay={getDayOfTheWeek(
            new Date(selectedYear, selectedMonth, 0)
          )}
          amountOfDays={amountOfDays}
        />
      </div>
      <MoodChart
        month={selectedMonth}
        year={selectedYear}
        amountOfDays={amountOfDays}
      />
    </div>
  );
};

export default CalendarManager;
