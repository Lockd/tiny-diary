import React from "react";
import { ReactComponent as MoodRed } from "../../images/mood-red.svg";
import { ReactComponent as MoodYellow } from "../../images/mood-yellow.svg";
import { ReactComponent as MoodBlue } from "../../images/mood-blue.svg";
import { ReactComponent as MoodPurple } from "../../images/mood-purple.svg";
import { ReactComponent as MoodGreen } from "../../images/mood-green.svg";

export const MOOD_INDICATORS_MAPPING = [
  {
    value: -2,
    label: (props: any) => <MoodRed {...props} />,
  },
  {
    value: -1,
    label: (props: any) => <MoodYellow {...props} />,
  },
  {
    value: 0,
    label: (props: any) => <MoodBlue {...props} />,
  },
  {
    value: 1,
    label: (props: any) => <MoodPurple {...props} />,
  },
  {
    value: 2,
    label: (props: any) => <MoodGreen {...props} />,
  },
];

export const getMoodIndicator = (mood: number, props: any) => {
  const moodIndex = MOOD_INDICATORS_MAPPING.findIndex(
    (indicator) => indicator.value === mood
  );

  if (moodIndex === -1) return null;

  return MOOD_INDICATORS_MAPPING[moodIndex].label(props);
};
