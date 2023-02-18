import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
