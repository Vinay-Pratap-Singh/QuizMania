import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase";
import toast from "react-hot-toast";

// for disabling the serializableCheck
// const customizedMiddleware=getDefaultMiddleware({serializableCheck:false})

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

    toast.promise(createAccountUsingEmail as unknown as Promise<unknown>, {
      loading: "Loading.....",
      success: "Account Created Successfully",
      error: "Failed to Create Account",
    });

    //  updating the user profile details
    firebaseAuth.currentUser &&
      (await updateProfile(firebaseAuth.currentUser, {
        displayName: userData.name,
      }));

    return res.user;
  }
);

// function to create account using google account
export const createAccountUsingGoogle = createAsyncThunk(
  "/auth/signup/google",
  async () => {
    try {
      // creating the user account using the google account
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(firebaseAuth, provider);
    } catch (error) {}
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
    try {
      // creating the user account using email and password
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        userData.email,
        userData.password
      );
    } catch (error: any) {
      toast.error(error?.message);
      toast.error("Failed to Create Account");
    }
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
      .addCase(createAccountUsingEmail.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Account Created Successfully");
        state.isLoggedIn = true;
      })
      .addCase(createAccountUsingEmail.rejected, (state, action) => {
        toast.remove();
        toast.error("Failed to Create Account");
      });
  },
});

// exporting my reducers
export const {} = authSlice.actions;

// exporting the slice reducer as deault
export default authSlice.reducer;
