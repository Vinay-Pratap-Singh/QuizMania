import { createSlice } from "@reduxjs/toolkit";

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
  isButtonClicked: false;
}

interface IuserAnswer {
  id: string;
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
    evaluation: "",
    level: "",
    length: "",
    category: "",
    isButtonClicked: false,
  },
  userAnswer: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    data: (state, action) => {
      state.data = [...action.payload];
    },
    option: (state, action) => {
      state.option = { ...action.payload };
    },
    answers: (state, action) => {},
  },
});

// exporting my reducers
export const { data, option, answers } = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
