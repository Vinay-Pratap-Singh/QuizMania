import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";
import { IinitialStateUser, IinitialStateUserData } from "../config/interfaces";

const initialState: IinitialStateUser = {
  data: [],
  isLoading: false,
};

// function to get the user data
export const getUsersData = createAsyncThunk("user/getdata", async () => {
  try {
    let userData: IinitialStateUserData[] = [];
    const query = await getDocs(collection(db, "user"));
    query.forEach((doc) => {
      const user = {
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
        quizAttempted: doc.data().quizAttempted,
        passed: doc.data().passed,
        failed: doc.data().failed,
      };
      userData.push(user);
    });

    return userData;
  } catch (error) {
    toast.error("Oops! Operation Failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.data = action.payload!;
        state.isLoading = false;
      })
      .addCase(getUsersData.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load user data");
      });
  },
});

// exporting my reducers
export const {} = userSlice.actions;

// exporting the category as default
export default userSlice.reducer;
