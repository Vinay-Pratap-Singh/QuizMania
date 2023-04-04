import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  getFirestore,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  endBefore,
  QuerySnapshot,
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
export const getQuestions = createAsyncThunk("question/display", async () => {
  try {
    let questions: ImyQuestionData[] = [];

    const res = await getDocs(query(collection(db, "questions")));
    res.docs.map((doc) => {
      const data = doc.data() as ImyQuestionData;
      data.id = doc.id;
      questions.push(data);
    });
    return { questions };
  } catch (error) {
    toast.error("Oops! Failed to get questions...");
  }
});

// function to add new question to the database
export const addNewQuestion = createAsyncThunk(
  "/question/add",
  async (data: InewQuestionData) => {
    try {
      const createdAt = new Date();
      const questionData = { ...data, createdAt };
      const res = addDoc(collection(db, "questions"), {
        ...questionData,
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
      const docRef = doc(db, "questions", data?.id!);
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

interface IrandomDataParameters {
  categoryName: string;
  length: number;
}
// function to get random questions
export const getRandomQuestions = createAsyncThunk(
  "get/randomQuestions",
  async (data: IrandomDataParameters) => {
    try {
      const res = await getDocs(
        query(
          collection(db, "questions"),
          where("categoryName", "==", data.categoryName)
        )
      );

      const allQuestions: ImyQuestionData[] = [];
      res.docs.map((doc) => {
        const data = doc.data() as ImyQuestionData;
        data.id = doc.id;
        allQuestions.push(data);
      });
      const randomQuestions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, data.length);
      return randomQuestions;
    } catch (error) {
      toast.error("Failed to load questions");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      if (action.payload?.questions) {
        state.questions = action.payload?.questions;
      }
    });
  },
});

// exporting my reducers
export const {} = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
