import React, { useEffect } from "react";
import styles from "./MainPage.module.scss";
import SignInButton from "../../Components/SignInButton/SignInButton";
import { useNavigate } from "react-router-dom";
import { getYearFromDate, getMonthIdxFromDate } from "../../utils/dateUtils";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDay } from "date-fns";

const MainPage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const currentDate = new Date();
  const currentYear = getYearFromDate(currentDate);
  const currentMonth = getMonthIdxFromDate(currentDate);
  const currentDay = getDay(currentDate);
  const currentDayLink = `/${currentYear}/${currentMonth + 1}/${
    currentDay + 1
  }`;

  useEffect(() => {
    if (user) {
      navigate(currentDayLink);
    }
  }, [user]);

  return (
    <div className={styles.mainPageContainer}>
      <h1>Tiny diary</h1>
      <p>
        A minimalistic diary app that allows you to track your daily mood and
        events that happened throughout the day.
        <br />
        <br />
        To make sure that your diary is saved and accessible from all of your
        devices please sing in using your google account.
      </p>
      <div className={styles.mainPageButetonsContainer}>
        <SignInButton />
      </div>
    </div>
  );
};

export default MainPage;
