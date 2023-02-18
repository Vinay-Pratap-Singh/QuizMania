import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "../config/firebase";

interface Istate {
  isLoggedIn: boolean;
  role: string;
}

// creating the initial state
const initialState: Istate = {
  isLoggedIn: false,
  role: "",
};

export interface IuserSignupData {
  name: string;
  email: string;
  password: string;
}

// function to create account
export const createAccount = createAsyncThunk(
  "/auth/signup",
  async (userData: IuserSignupData) => {
    try {
      // creating the user account
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        userData.email,
        userData.password
      );
      console.log(res);

      //  updating the user profile details
      firebaseAuth.currentUser &&
        (await updateProfile(firebaseAuth.currentUser, {
          displayName: userData.name,
        }));
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// exporting my reducers
export const {} = authSlice.actions;

// exporting the slice reducer as deault
export default authSlice.reducer;
