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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { USER_ROLE } from "../config/config";

interface Istate {
  isLoggedIn: boolean;
  role: string[];
  name: string | null;
  email: string;
}

// creating the initial state
const initialState: Istate = {
  isLoggedIn: false,
  role: [],
  name: "",
  email: "",
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
      email: userData.email,
      role: [USER_ROLE],
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

    //  updating the user profile details
    firebaseAuth.currentUser &&
      (await updateProfile(firebaseAuth.currentUser, {
        displayName: res.user.displayName,
      }));

    // adding the role and name data to firestore
    await setDoc(doc(db, "user", `${res.user.uid}`), {
      name: res.user.displayName,
      email: res.user.email,
      role: [USER_ROLE],
    });

    // getting the name, email and role data (user personal details)
    const docRef = await doc(db, "user", res.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
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

    // getting the name, email and role data (user personal details)
    const docRef = await doc(db, "user", res.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases for creating account using email and password
      .addCase(createAccountUsingEmail.pending, () => {
        toast.loading("Wait! Creating your account...");
      })
      .addCase(createAccountUsingEmail.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Account created successfully");
      })
      .addCase(createAccountUsingEmail.rejected, (state, action) => {
        toast.remove();
        toast.error("Failed to Create Account");
        const message: string | undefined = action.error.message as string;
        toast.error(message);
      })
      // cases for creating account using google authentication
      .addCase(usingGoogleAuthentication.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
        state.name = action?.payload?.name;
        state.role = action?.payload?.role;
        state.email = action?.payload?.email;
      })
      .addCase(usingGoogleAuthentication.rejected, () => {
        toast.remove();
        toast.error("Failed to logged in using google account");
      })
      // cases for user login using email and password
      .addCase(loginUsingEmail.pending, () => {
        toast.loading("Wait! verifying your credential...");
      })
      .addCase(loginUsingEmail.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
        state.name = action?.payload?.name;
        state.role = action?.payload?.role;
        state.email = action?.payload?.email;
      })
      .addCase(loginUsingEmail.rejected, () => {
        toast.remove();
        toast.error("Invalid Credential");
      })
      // cases for user logout
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.name = "";
        state.role = [];
        state.email = "";
        toast.success("Logout Successful");
      })
      .addCase(logout.rejected, () => {
        toast.error("Failed to logout");
      });
  },
});

// exporting my reducers
export const {} = authSlice.actions;

// exporting the slice as default
export default authSlice.reducer;
