import React from "react";
import TextEditor from "../../Components/TextEditor/TextEditor";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import MoodSelector from "../../Components/MoodSelector/MoodSelector";
import { Button } from "@mui/material";
import styles from "./EditDiaryPage.module.scss";
import { useAppSelector } from "../../app/hooks";

const EditDiary = () => {
  const { year, month, day } = useParams();
  const navigate = useNavigate();
  const yearData = useAppSelector((state) => state.diary?.[year!]);

  const isDayPresent =
    (day?.length === 2 || day?.length === 1) && !Number.isNaN(parseInt(day));
  const isMonthPresent =
    (month?.length === 2 || month?.length === 1) &&
    !Number.isNaN(parseInt(month));
  const isYearPresent = year?.length === 4 && !Number.isNaN(parseInt(year));

  if (!isDayPresent || !isMonthPresent || !isYearPresent || !yearData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={styles.editDiaryTitleContainer}>
        <Button onClick={() => navigate(-1)} variant="outlined">
          {"<-"}
        </Button>
        <h2>Diary entry for {`${day!}.${month!}.${year}`}</h2>
      </div>
      <MoodSelector day={day!} month={month!} year={year!} />
      <TextEditor day={day!} month={month!} year={year!} />
    </>
  );
};

export default EditDiary;
