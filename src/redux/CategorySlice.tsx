import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";

interface IstateData {
  categoryName: string;
  id: string;
}

const initialState: IstateData[] = [];

export const getCategory = createAsyncThunk("category/get", async () => {
  try {
    let categories: IstateData[] = [];
    const query = getDocs(collection(db, "category"));

    toast.promise(query, {
      loading: "Fetching the data",
      success: "Data fetched successfully",
      error: "Failed to fetch data",
    });

    const querySnapshot = await query;

    querySnapshot.forEach((doc) => {
      categories.push({
        categoryName: doc.data().categoryName,
        id: doc.id,
      });
    });

    return categories;
  } catch (error) {
    toast.error("Try again!!");
  }
});

export const addCategory = createAsyncThunk(
  "category/add",
  async (newCategory: string) => {
    try {
      const res = addDoc(collection(db, "category"), {
        categoryName: newCategory,
      });

      toast.promise(res, {
        loading: "Adding the category...",
        success: "Category added successfully",
        error: "Failed to add category",
      });

      const response = await res;

      return response;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string) => {
    try {
      const res = deleteDoc(doc(db, "category", id));
      toast.promise(res, {
        loading: "Deleting the category...",
        success: "Category deleted successfully",
        error: "Failed to delete category",
      });

      const response = await res;

      return response;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      return action?.payload!;
    });
  },
});

// exporting my reducers
export const {} = categorySlice.actions;

// exporting the category as default
export default categorySlice.reducer;
