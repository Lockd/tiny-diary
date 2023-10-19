import React from "react";
import { Button } from "@mui/material";
import styles from "./MoodSelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setMood } from "../../Features/Diary/diarySlice";
import { MOOD_OPTIONS } from "../../utils/constants";

interface IMoodSlider {
  day: string;
  month: string;
  year: string;
}

const MoodSlider: React.FC<IMoodSlider> = ({ day, month, year }) => {
  const dispatch = useAppDispatch();
  const mood = useAppSelector(
    (state) => state.diary?.[year]?.[month]?.[day]?.mood
  );

  const onChangeMood = (value: number) => {
    dispatch(setMood({ year, month, day, mood: value }));
  };

  return (
    <div className={styles.moodSliderWrapper}>
      <h2 className={styles.moodSliderTitle}>How was your mood today?</h2>
      <div className={styles.moodButtonsContainer}>
        {MOOD_OPTIONS.map((moodOption) => (
          <Button
            className={styles.moodButton}
            variant={moodOption.value === mood ? "contained" : "outlined"}
            key={moodOption.value}
            onClick={() => onChangeMood(moodOption.value)}
          >
            {moodOption.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSlider;
