import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";

export interface IcategoryStateData {
  categoryName: string;
  id: string;
}

interface IinitialState {
  categoryData: IcategoryStateData[];
  isLoading: boolean;
}

const initialState: IinitialState = {
  categoryData: [],
  isLoading: false,
};

// for getting the category data
export const getCategory = createAsyncThunk("category/get", async () => {
  try {
    let categories: IcategoryStateData[] = [];
    const query = await getDocs(collection(db, "category"));
    query.forEach((doc) => {
      categories.push({
        categoryName: doc.data().categoryName,
        id: doc.id,
      });
    });

    return categories;
  } catch (error) {
    toast.error("Operation Failed!!!");
  }
});

// for adding the new category
export const addCategory = createAsyncThunk(
  "category/add",
  async (newCategory: string) => {
    try {
      const res = await addDoc(collection(db, "category"), {
        categoryName: newCategory,
      });
      return res;
    } catch (error) {
      toast.error("Operation Failed!!!");
    }
  }
);

// for deleting the category
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id: string) => {
    try {
      const res = deleteDoc(doc(db, "category", id));
      return res;
    } catch (error) {
      toast.error("Operation Failed!!!");
    }
  }
);

// for updating the existing category
export const updateCategory = createAsyncThunk(
  "category/update",
  async (data: IcategoryStateData) => {
    try {
      const ref = doc(db, "category", data.id);
      const res = await updateDoc(ref, { categoryName: data.categoryName });
      return res;
    } catch (error) {
      toast.error("Operation Failed!!!");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for setting the data in state
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categoryData = action.payload!;
        state.isLoading = false;
      })
      .addCase(getCategory.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to load category data");
      });

    // for adding the category
    builder
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Category added successfully");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to add new category");
      });

    // for deleting the category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Category deleted successfully");
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to delete category");
      });

    // for updating the category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Category updated successfully");
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update the category");
      });
  },
});

// exporting my reducers
export const {} = categorySlice.actions;

// exporting the category as default
export default categorySlice.reducer;
