import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  token?: string;
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  profilePicture: string | null;
}

type ISetUserInfo = Omit<IUser, "isLoggedIn">;

const initialState: IUser = {
  token: "",
  email: null,
  name: "",
  profilePicture: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, payload: PayloadAction<ISetUserInfo>) {
      const { name, token, email, profilePicture } = payload.payload;
      state.name = name;
      state.token = token;
      state.email = email;
      state.profilePicture = profilePicture;
      state.isLoggedIn = true;
    },
    clearUserData(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.email = "";
      state.profilePicture = "";
      state.name = "";
    },
  },
});

export const { setUserInfo, clearUserData } = userSlice.actions;
export default userSlice.reducer;
