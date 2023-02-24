import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db, firebaseAuth } from "../config/firebase";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";

interface Istate {
  isLoggedIn: boolean;
  role: string;
  name: string | null;
}

// creating the initial state
const initialState: Istate = {
  isLoggedIn: false,
  role: "",
  name: "",
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

    // adding the role and name data to firestore
    await setDoc(doc(db, "user", `${res.user.uid}`), {
      name: userData.name,
      role: "user",
    });
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

// function to logout the user
export const logout = createAsyncThunk("/auth/logout", async () => {
  const res = await signOut(firebaseAuth);
  return res;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isUserLoggedIn: (state) => {
      const user = firebaseAuth.currentUser;
      if (!user) {
        state.isLoggedIn = false;
        state.name = "";
      } else {
        state.isLoggedIn = true;
        state.name = user.displayName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // cases for creating account using email and password
      .addCase(createAccountUsingEmail.pending, () => {
        toast.loading("Wait! Creating your account...");
      })
      .addCase(createAccountUsingEmail.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Account created successfully");
        state.name = action.payload.user.displayName;
        state.isLoggedIn = true;
      })
      .addCase(createAccountUsingEmail.rejected, (state, action) => {
        toast.remove();
        toast.error("Failed to Create Account");
        const message: string | undefined = action.error.message as string;
        toast.error(message);
        console.log(action.error);
      })
      // cases for creating account using google authentication
      .addCase(usingGoogleAuthentication.pending, () => {
        toast.loading("Wait! Fetching the data...");
      })
      .addCase(usingGoogleAuthentication.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.name = action.payload.user.displayName;
        state.isLoggedIn = true;
      })
      .addCase(usingGoogleAuthentication.rejected, () => {
        toast.remove();
        toast.error("Failed to logged in using google account");
      })
      // cases for user login using email and password
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
        toast.error("Invalid Credential");
      })
      // cases for user logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.name = "";
        toast.success("Logout Successful");
      })
      .addCase(logout.rejected, () => {
        toast.error("Failed to logout");
      });
  },
});

// exporting my reducers
export const { isUserLoggedIn } = authSlice.actions;

// exporting the slice as default
export default authSlice.reducer;
