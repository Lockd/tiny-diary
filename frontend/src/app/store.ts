import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../Features/Diary/diarySlice";

export const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
});

// TODO it's possible to use built in async requests for the async data
// those things will be neatly typed
// more info here https://redux-toolkit.js.org/tutorials/rtk-query

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
