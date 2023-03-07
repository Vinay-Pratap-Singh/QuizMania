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
import {
  ImyQuestionData,
  InewQuestionData,
  IquizSliceState,
} from "../config/interfaces";
export interface IData {
  id: number;
  question: string;
  description: string;
  answers: object;
  multiple_correct_answers: string;
  correct_answers: object;
  correct_answer: string;
  explanation: string | null;
  tip: string | null;
  tags: object[];
  category: string;
  difficulty: string;
}

export interface IuserAnswer {
  id: number;
  index: number;
  correctAnswer: string;
  userAnswer: string;
}

export interface Ioption {
  evaluation: string;
  level: string;
  length: string;
  category: string;
  isButtonClicked: boolean;
}

export interface Istate {
  data: IData[];
  option: Ioption;
  userAnswer: IuserAnswer[];
}

// const initialState: Istate = {
//   data: [],
//   option: {
//     evaluation: "normal",
//     level: "Easy",
//     length: "5",
//     category: "uncategorized",
//     isButtonClicked: false,
//   },
//   userAnswer: [],
// };

// interface for chart data
interface IchartDatasets {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
}

export interface IchartData {
  labels: string[];
  datasets: IchartDatasets[];
}

const initialState: IquizSliceState = {
  questions: [],
};

// function to get all questions
export const getAllQuestion = createAsyncThunk("question/display", async () => {
  try {
    let questions: ImyQuestionData[] = [];
    const query = getDocs(collection(db, "questions"));

    toast.promise(query, {
      loading: "Fetching the data",
      success: "Data fetched successfully",
      error: "Failed to fetch data",
    });

    const querySnapshot = await query;

    querySnapshot.forEach((doc) => {
      // destructuring the data
      const {
        question,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        categoryName,
        description,
      } = doc.data();

      // adding the id to the data
      const myQuestion: ImyQuestionData = {
        id: doc.id,
        question,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        categoryName,
        description,
      };

      questions.push(myQuestion);
    });

    return questions;
  } catch (error) {
    toast.error("Try again!!");
  }
});

// function to add new question to the database
export const addNewQuestion = createAsyncThunk(
  "/question/add",
  async (data: InewQuestionData) => {
    try {
      const res = addDoc(collection(db, "questions"), {
        ...data,
      });

      toast.promise(res, {
        loading: "Adding the question...",
        success: "Question added successfully",
        error: "Failed to add question",
      });

      const response = await res;

      return response;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

// function to delete a question from database
export const deleteQuestion = createAsyncThunk(
  "question/delete",
  async (id: string) => {
    try {
      const res = deleteDoc(doc(db, "questions", id));

      toast.promise(res, {
        loading: "Deleting the question...",
        success: "Question deleted successfully",
        error: "Failed to delete question",
      });

      const response = await res;

      return response;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

// function to update the question in the database
export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (data: ImyQuestionData) => {
    try {
      const docRef = doc(db, "questions", data.id);
      const newData: InewQuestionData = {
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        correctOption: data.correctOption,
        categoryName: data.categoryName,
        description: data.description,
      };
      const res = updateDoc(docRef, {
        ...newData,
      });

      toast.promise(res, {
        loading: "Updating the question...",
        success: "Question updated successfully",
        error: "Failed to update question",
      });

      const response = await res;

      return response;
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllQuestion.fulfilled, (state, action) => {
      // setting the data in state while mentioning that the payload will be there always
      state.questions = action.payload!;
    });
  },
});

// exporting my reducers
export const {} = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
