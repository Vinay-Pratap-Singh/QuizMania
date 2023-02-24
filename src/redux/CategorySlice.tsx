import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState: string[] = [];

export const getCategory = createAsyncThunk("category/get", async () => {
  const getCategoryData = await doc(db, "category");
});

export const addCategory = createAsyncThunk(
  "category/add",
  async (newCategory: string) => {
    const res = await setDoc(doc(db, "category"), { newCategory });
    console.log(res);
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async () => {}
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

// exporting my reducers
export const {} = categorySlice.actions;

// exporting the category as default
export default categorySlice.reducer;
