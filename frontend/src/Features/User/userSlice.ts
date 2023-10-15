import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  token?: string;
  email: string | null;
  name: string | null;
  isLoggedIn: boolean;
  profilePicture: string | null;
  uid: string | null;
  isLoading: boolean;
}

type ISetUserInfo = Omit<IUser, "isLoggedIn" | "isLoading">;

const initialState: IUser = {
  token: "",
  email: null,
  name: null,
  profilePicture: null,
  isLoggedIn: false,
  uid: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, payload: PayloadAction<ISetUserInfo>) {
      const { name, token, email, profilePicture, uid } = payload.payload;
      state.name = name;
      state.token = token;
      state.email = email;
      state.profilePicture = profilePicture;
      state.isLoggedIn = true;
      state.uid = uid;
    },
    clearUserData(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.email = null;
      state.profilePicture = null;
      state.name = "";
      state.uid = null;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload.payload.isLoading;
    },
  },
});

export const { setUserInfo, clearUserData, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
