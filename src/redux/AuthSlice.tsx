import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase";
import toast from "react-hot-toast";

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

// function to create account using email id
export const createAccountUsingEmail = createAsyncThunk(
  "/auth/signup",
  async (userData: IuserSignupData) => {
    // creating the user account using email and password
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      userData.email,
      userData.password
    );

    //  updating the user profile details
    firebaseAuth.currentUser &&
      (await updateProfile(firebaseAuth.currentUser, {
        displayName: userData.name,
      }));

    return res;
  }
);

// function to create account using google account
export const usingGoogleAuthentication = createAsyncThunk(
  "/auth/google",
  async () => {
    // creating the user account using the google account
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    return res;
  }
);

// function to check user is logged in or not
export const isLoggedIn = () => {
  const check = firebaseAuth.currentUser;
  if (check) return true;
  else return false;
};

export interface IuserLoginData {
  email: string;
  password: string;
}

// function to login using email and password
export const loginUsingEmail = createAsyncThunk(
  "auth/login",
  async (userData: IuserLoginData) => {
    // creating the user account using email and password
    const res = await signInWithEmailAndPassword(
      firebaseAuth,
      userData.email,
      userData.password
    );

    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccountUsingEmail.pending, () => {
        toast.loading("Wait! Creating your account...");
      })
      .addCase(createAccountUsingEmail.fulfilled, () => {
        toast.remove();
        toast.success("Login to your account");
        toast.success("Account created successfully");
      })
      .addCase(createAccountUsingEmail.rejected, () => {
        toast.remove();
        toast.error("Failed to Create Account");
      })
      .addCase(usingGoogleAuthentication.pending, () => {
        toast.loading("Wait! Fetching the data...");
      })
      .addCase(usingGoogleAuthentication.fulfilled, (state) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
      })
      .addCase(usingGoogleAuthentication.rejected, () => {
        toast.remove();
        toast.error("Failed to logged in using google account");
      })
      .addCase(loginUsingEmail.pending, () => {
        toast.loading("Wait! verifying your credential...");
      })
      .addCase(loginUsingEmail.fulfilled, (state) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
      })
      .addCase(loginUsingEmail.rejected, () => {
        toast.remove();
        toast.error("Failed to logged in");
      });
  },
});

// exporting my reducers
export const {} = authSlice.actions;

// exporting the slice reducer as deault
export default authSlice.reducer;
