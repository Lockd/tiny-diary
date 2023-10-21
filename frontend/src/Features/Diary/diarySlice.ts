import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OutputBlockData } from "@editorjs/editorjs";
import type { TBackendDiaryEntry } from "../../types";
import {
  addDoc,
  collection,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { RootState } from "../../app/store";

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

interface SaveDiaryPayload {
  day: string;
  month: string;
  year: string;
  uid?: string;
}

interface SetMoodPayload {
  mood: number;
  day: string;
  month: string;
  year: string;
}

export const saveDiary = createAsyncThunk(
  "diary/saveDiary",
  async (data: SaveDiaryPayload, thunkApi) => {
    const { day, month, year, uid } = data;

    if (!uid) {
      console.log("[DiarySlice]: no uid, impossible to save document");
      return;
    }

    const state = thunkApi.getState() as RootState;

    try {
      const dayCollection = collection(db, "users", uid, year);

      const dataToStore = {
        ...state.diary?.[year]?.[month]?.[day],
        day,
        month,
        year,
      };

      const daysQuery = query(
        dayCollection,
        where("year", "==", year),
        where("month", "==", month),
        where("day", "==", day)
      );
      const documents = await getDocs(daysQuery);

      if (documents.size > 0) {
        const docRef = documents.docs[0].ref;
        await setDoc(docRef, dataToStore);
        console.log("[DiarySlice] edited existing document", dataToStore);
      } else {
        await addDoc(dayCollection, dataToStore);
        console.log("[DiarySlice] added new document", dataToStore);
      }
    } catch (e) {
      console.error("[DiarySlice]: error saving diary", e);
    }
    return null;
  }
);

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
    clearDiary(state) {
      Object.keys(state).forEach((year) => {
        state[year] = {};
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveDiary.fulfilled, (state, action) => {
      console.log("[DiarySlice]: diary should be saved");
    });
  },
});

export const { updateDiaryEntry, populateDiary, setMood, clearDiary } =
  diarySlice.actions;
export default diarySlice.reducer;
