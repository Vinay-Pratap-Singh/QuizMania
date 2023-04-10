import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db, firebaseAuth } from "../config/firebase";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface Istate {
  isLoggedIn: boolean;
  uid: string;
  role: string[];
  name: string | null;
  email: string;
  quizAttempted: number;
  passed: number;
  failed: number;
  isLoading: boolean;
}

// creating the initial state
const initialState: Istate = {
  isLoggedIn: false,
  uid: "",
  role: [],
  name: "",
  email: "",
  quizAttempted: 0,
  passed: 0,
  failed: 0,
  isLoading: false,
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
      role: [process.env.REACT_APP_USER_ROLE!],
      quizAttempted: 0,
      passed: 0,
      failed: 0,
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
    const { isNewUser } = getAdditionalUserInfo(res)!;

    if (isNewUser) {
      //  updating the user profile details
      firebaseAuth.currentUser &&
        (await updateProfile(firebaseAuth.currentUser, {
          displayName: res.user.displayName,
        }));

      // adding the role and name data to firestore
      await setDoc(doc(db, "user", `${res.user.uid}`), {
        name: res.user.displayName,
        email: res.user.email,
        role: [process.env.REACT_APP_USER_ROLE!],
        quizAttempted: 0,
        passed: 0,
        failed: 0,
      });
    }

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
    return res.user;
  }
);

// function to logout the user
export const logout = createAsyncThunk("/auth/logout", async () => {
  const res = await signOut(firebaseAuth);
  return res;
});

// function to get user data
export const getUserData = createAsyncThunk(
  "getUserData",
  async (id: string) => {
    try {
      // getting the name, email and role data (user personal details)
      const docRef = await doc(db, "user", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
    } catch (error) {
      toast.error("Failed to get user data");
    }
  }
);

interface IupdateUserDataParameter {
  quizAttempted: number;
  passed: number;
  failed: number;
  uid: string;
}
// function to update user details
export const updateUserDetails = createAsyncThunk(
  "user/update",
  async (data: IupdateUserDataParameter) => {
    try {
      const ref = doc(db, "user", data?.uid);
      const res = await updateDoc(ref, {
        failed: data?.failed,
        passed: data?.passed,
        quizAttempted: data?.quizAttempted,
      });
      return res;
    } catch (error) {
      toast.error("Failed to update the result of user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases for creating account using email and password
      .addCase(createAccountUsingEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccountUsingEmail.fulfilled, (state) => {
        toast.success("Account created successfully");
        state.isLoading = false;
      })
      .addCase(createAccountUsingEmail.rejected, (state, action) => {
        const message: string | undefined = action.error.message as string;
        toast.error(message);
        state.isLoading = false;
      })
      // cases for creating account using google authentication
      .addCase(usingGoogleAuthentication.fulfilled, (state) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
      })
      .addCase(usingGoogleAuthentication.rejected, () => {
        toast.remove();
        toast.error("Failed to login using google account");
      })
      // cases for user login using email and password
      .addCase(loginUsingEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUsingEmail.fulfilled, (state, action) => {
        toast.remove();
        toast.success("Logged in successfully");
        state.isLoggedIn = true;
        state.uid = action?.payload?.uid;
        state.isLoading = false;
      })
      .addCase(loginUsingEmail.rejected, (state) => {
        toast.remove();
        toast.error("Invalid credentials");
        state.isLoading = false;
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
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.name = action?.payload?.name;
        state.role = action?.payload?.role;
        state.email = action?.payload?.email;
        state.quizAttempted = action?.payload?.quizAttempted;
        state.passed = action?.payload?.passed;
        state.failed = action?.payload?.failed;
        state.isLoading = false;
      })
      .addCase(getUserData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// exporting my reducers
export const {} = authSlice.actions;

// exporting the slice as default
export default authSlice.reducer;
