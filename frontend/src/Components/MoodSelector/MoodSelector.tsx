import React from "react";
import { Button } from "@mui/material";
import styles from "./MoodSelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setMood } from "../../Features/Diary/diarySlice";
import { MOOD_INDICATORS_MAPPING } from "../MoodIndicator/MoodIndicator";

interface IMoodSelector {
  day: string;
  month: string;
  year: string;
}

const MoodSelector: React.FC<IMoodSelector> = ({ day, month, year }) => {
  const dispatch = useAppDispatch();
  const mood = useAppSelector(
    (state) => state.diary?.[year]?.[month]?.[day]?.mood
  );

  const onChangeMood = (value: number) => {
    dispatch(setMood({ year, month, day, mood: value }));
  };

  return (
    <div className={styles.moodSelectorWrapper}>
      <h2 className={styles.moodSelectorTitle}>How was your mood today?</h2>
      <div className={styles.moodButtonsContainer}>
        {MOOD_INDICATORS_MAPPING.map((moodOption) => (
          <Button
            sx={{
              padding: "0.5rem",
              borderColor: moodOption.value === mood ? "#1976d2" : "#bbb",
              backgroundColor:
                moodOption.value === mood ? "#91c8ff3b" : "transparent",
            }}
            className={styles.moodButton}
            variant="outlined"
            key={moodOption.value}
            onClick={() => onChangeMood(moodOption.value)}
          >
            {moodOption.label({})}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
