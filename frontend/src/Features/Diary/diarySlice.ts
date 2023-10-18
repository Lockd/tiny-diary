import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OutputBlockData } from "@editorjs/editorjs";
import type { TBackendDiaryEntry } from "../../types";

interface DiaryState {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        blocks: OutputBlockData[];
        version?: string;
        time?: number;
        mood?: number;
      };
    };
  };
}

const initialState: DiaryState = {};

interface PopulateDiaryPayload {
  entries: {
    [key: string]: TBackendDiaryEntry;
  };
  month: string;
  year: string;
}

interface SetMoodPayload {
  day: string;
  month: string;
  year: string;
  mood: number;
}

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    updateDiaryEntry(state, payload: PayloadAction<TBackendDiaryEntry>) {
      const { day, month, year, blocks, time, version } = payload.payload;
      state[year] = {
        ...state?.[year],
        [month]: {
          ...state?.[year]?.[month],
          [day]: {
            ...state?.[year]?.[month]?.[day],
            blocks,
            time,
            version,
          },
        },
      };
    },
    setMood(state, payload: PayloadAction<SetMoodPayload>) {
      const { day, month, year, mood } = payload.payload;
      state[year] = {
        ...state?.[year],
        [month]: {
          ...state?.[year]?.[month],
          [day]: {
            ...state?.[year]?.[month]?.[day],
            mood,
          },
        },
      };
    },
    populateDiary(state, payload: PayloadAction<PopulateDiaryPayload>) {
      const { month, year, entries } = payload.payload;
      state[year] = {
        ...state[year],
        [month]: entries,
      };
    },
  },
});

export const { updateDiaryEntry, populateDiary, setMood } = diarySlice.actions;
export default diarySlice.reducer;
