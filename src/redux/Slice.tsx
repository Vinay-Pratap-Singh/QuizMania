import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../config/config";

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

// function to fetch the data from the api
export const fetchData = createAsyncThunk(
  "getdata",
  async (option: Ioption) => {
    try {
      const { category, length, level } = option;
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}&category=${category}&difficulty=${level}&limit=${Number(length)}`
      );
      console.log(length);
      
      return response.data;
    } catch (error) {}
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
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(state.data);
      
    });
  },
});

// exporting my reducers
export const { setOption, setAnswers, removeAnswers } = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
