import React, { useEffect } from "react";
import styles from "./HomePage.module.scss";
import SignInButton from "../../Components/SignInButton/SignInButton";
import { useNavigate } from "react-router-dom";
import { getYearFromDate, getMonthIdxFromDate } from "../../utils/dateUtils";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const currentDate = new Date();
  const currentYear = getYearFromDate(currentDate);
  const currentMonth = getMonthIdxFromDate(currentDate);
  const currentMonthLink = `/${currentYear}/${currentMonth + 1}`;

  useEffect(() => {
    if (user) {
      navigate(currentMonthLink);
    }
  }, [user]);

  return (
    <div className={styles.homePageContainer}>
      <h1 className={styles.homePageTitle}>
        <span className={styles.homePageSmallTitle}>Tiny</span>
        <br />
        diary
      </h1>
      <p className={styles.homePageDescription}>
        A minimalistic diary app that allows you to track your daily mood and
        events that happened throughout the day.
        <br />
        <br />
        To make sure that your diary is saved and accessible from all of your
        devices please sing in using your google account.
      </p>
      <div className={styles.homePageButtonsContainer}>
        <SignInButton className={styles.homePageSignInButton} />
      </div>
    </div>
  );
};

export default HomePage;
