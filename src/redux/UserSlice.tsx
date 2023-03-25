import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";
import { IinitialStateUser } from "../config/interfaces";

const initialState: IinitialStateUser[] = [];

// function to get the user data
export const getUserData = createAsyncThunk("user/getdata", async () => {
  try {
    let userData: IinitialStateUser[] = [];
    const query = getDocs(collection(db, "user"));

    toast.promise(query, {
      loading: "Fetching the users detail",
      success: "Users detail fetched successfully",
      error: "Failed to fetch users detail",
    });

    const querySnapshot = await query;

    querySnapshot.forEach((doc) => {
      const user = {
        name: doc.data().name,
        email: doc.data().email,
        role: doc.data().role,
      };
      userData.push(user);
    });

    return userData;
  } catch (error) {
    toast.error("Oops!Operation Failed");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      return action?.payload!;
    });
  },
});

// exporting my reducers
export const {} = userSlice.actions;

// exporting the category as default
export default userSlice.reducer;
