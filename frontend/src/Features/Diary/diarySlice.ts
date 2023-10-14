import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OutputBlockData } from "@editorjs/editorjs";

interface DiaryState {
  [key: string]: {
    blocks: OutputBlockData[];
    version?: string;
    time?: number;
  };
}

const initialState: DiaryState = {};

interface SavePayload {
  date: string;
  blocks: OutputBlockData[];
  version?: string;
  time?: number;
}

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    updateDiaryEntry(state, payload: PayloadAction<SavePayload>) {
      const { date, blocks, time, version } = payload.payload;
      state[date] = { blocks, time, version };
    },
  },
});

export const { updateDiaryEntry } = diarySlice.actions;
export default diarySlice.reducer;
