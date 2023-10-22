import React from "react";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import MoodSelector from "../../Components/MoodSelector/MoodSelector";
import { Button } from "@mui/material";
import styles from "./EditDiaryPage.module.scss";
import { useAppSelector } from "../../app/hooks";
import { auth } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  isDayPresent,
  isMonthPresent,
  isYearPresent,
} from "../../utils/dateUtils";

const EditDiary = () => {
  const { year, month, day } = useParams();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const yearData = useAppSelector((state) => state.diary?.[year!]);

  const isDay = isDayPresent(day);
  const isMonth = isMonthPresent(month);
  const isYear = isYearPresent(year);

  if (!isDay || !isMonth || !isYear || (!yearData && user)) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={styles.editDiaryTitleContainer}>
        <Button
          size="small"
          variant="outlined"
          className={styles.editDiaryBackButton}
          onClick={() => navigate(`/${year}/${month}`)}
        >
          Return to calendar view
        </Button>
      </div>
      <MoodSelector day={day!} month={month!} year={year!} />
      <TextEditor day={day!} month={month!} year={year!} />
    </>
  );
};

export default EditDiary;
