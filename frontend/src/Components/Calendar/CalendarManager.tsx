import React, { useState, useEffect } from "react";
import {
  getMonthIdxFromDate,
  getDaysInMonth,
  getYearFromDate,
  getMonthName,
  getDayOfTheWeek,
} from "../../utils/dateUtils";
import CalendarMonth from "./CalendarMonth";
import styles from "./Calendar.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { db } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TBackendDiaryEntry } from "../../types";
import { populateDiary } from "../../Features/Diary/diarySlice";

const CalendarManager: React.FC<any> = () => {
  const dispatch = useAppDispatch();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    getMonthIdxFromDate(new Date())
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    getYearFromDate(new Date())
  );
  const uid = useAppSelector((state) => state.user.uid);
  const currentMonthDiary = useAppSelector(
    (state) => state.diary?.[selectedYear]?.[selectedMonth + 1]
  );
  const monthName = getMonthName(selectedMonth);

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
          year={selectedYear}
          month={selectedMonth}
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
