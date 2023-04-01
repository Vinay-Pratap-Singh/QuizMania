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
  lastDoc: undefined,
  length: 0,
};

// function to get all questions
export const getQuestions = createAsyncThunk(
  "question/display",
  async (searchLimit: number) => {
    try {
      let questions: ImyQuestionData[] = [];
      let lastDoc: QueryDocumentSnapshot<DocumentData> | undefined = undefined;
      const res = await getDocs(
        query(collection(db, "questions"), limit(searchLimit))
      );
      res.docs.map((doc) => {
        const data = doc.data() as ImyQuestionData;
        data.id = doc.id;
        questions.push(data);
        lastDoc = doc;
      });
      return { questions, lastDoc };
    } catch (error) {
      toast.error("Oops! Failed to get questions...");
    }
  }
);

interface IgetNextPageQuestionData {
  searchLimit: number;
  lastDoc: QueryDocumentSnapshot<DocumentData> | undefined;
}
// function for getting the next page questions
export const getNextPageQuestion = createAsyncThunk(
  "question/nextpage",
  async (data: IgetNextPageQuestionData) => {
    const { searchLimit, lastDoc } = data;
    if (!lastDoc) {
      return;
    }
    try {
      let questions: ImyQuestionData[] = [];
      let nextLastDoc: QueryDocumentSnapshot<DocumentData> | undefined =
        undefined;
      const res = await getDocs(
        query(
          collection(db, "questions"),
          limit(searchLimit),
          startAfter(lastDoc)
        )
      );
      res.docs.map((doc) => {
        const data = doc.data() as ImyQuestionData;
        data.id = doc.id;
        questions.push(data);
        nextLastDoc = doc;
      });
      return { questions, nextLastDoc };
    } catch (error) {
      toast.error("Oops! Failed to get questions...");
    }
  }
);

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

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.lastDoc = action.payload?.lastDoc;
        if (action.payload?.questions) {
          state.questions = action.payload?.questions;
        }
      })
      .addCase(getNextPageQuestion.fulfilled, (state, action) => {
        if (action.payload?.questions.length === 0) {
          return;
        }
        state.lastDoc = action.payload?.nextLastDoc;
        if (action.payload?.questions) {
          state.questions = action.payload?.questions;
        }
        console.log(action.payload?.questions);
      });
  },
});

// exporting my reducers
export const {} = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
