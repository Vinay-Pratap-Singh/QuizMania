import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";
import { InewQuestionData } from "../config/interfaces";
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

const initialState: Istate = {
  data: [],
  option: {
    evaluation: "normal",
    level: "Easy",
    length: "5",
    category: "uncategorized",
    isButtonClicked: false,
  },
  userAnswer: [],
};

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

// function to add new question to the database
export const addNewQuestion = createAsyncThunk(
  "add/question",
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

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setOption: (state, action) => {
      state.option = { ...action.payload };
    },
    setAnswers: (state, action) => {},
    removeAnswers: (state) => {
      state.userAnswer = [];
    },
  },
});

// exporting my reducers
export const { setOption, setAnswers, removeAnswers } = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
