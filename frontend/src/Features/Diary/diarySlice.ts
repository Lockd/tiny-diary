import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OutputBlockData } from "@editorjs/editorjs";

interface DiaryState {
  [key: string]: {
    [key: string]: {
      [key: string]: {
        blocks: OutputBlockData[];
        version?: string;
        time?: number;
      };
    };
  };
}

const initialState: DiaryState = {};

interface SavePayload {
  day: string;
  month: string;
  year: string;
  blocks: OutputBlockData[];
  version?: string;
  time?: number;
}

interface AddEmptyDiaryEntryPayload {
  day: string;
  month: string;
  year: string;
}

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addEmptyDiaryEntry(
      state,
      payload: PayloadAction<AddEmptyDiaryEntryPayload>
    ) {
      const { day, month, year } = payload.payload;
      // This feels like hell of a workaround
      state[year] = {
        [month]: {
          [day]: {
            blocks: [],
          },
        },
      };
    },
    updateDiaryEntry(state, payload: PayloadAction<SavePayload>) {
      const { day, month, year, blocks, time, version } = payload.payload;
      state[year] = {
        ...state[year],
        [month]: {
          ...state[year][month],
          [day]: {
            blocks,
            time,
            version,
          },
        },
      };
    },
  },
});

export const { updateDiaryEntry, addEmptyDiaryEntry } = diarySlice.actions;
export default diarySlice.reducer;
