import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";
import {
  IanswerSchema,
  InewQuestionData,
  IquestionSchema,
  IquizSliceState,
  IupdateFunctionData,
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
  answers: [],
  isLoading: false,
};

// function to get all questions
export const getQuestions = createAsyncThunk("get/questions", async () => {
  try {
    let questions: IquestionSchema[] = [];

    const res = await getDocs(query(collection(db, "questions")));
    res.docs.map((doc) => {
      const data = doc.data() as IquestionSchema;
      data.id = doc.id;
      questions.push(data);
    });
    return { questions };
  } catch (error) {
    toast.error("Oops! Failed to get questions...");
  }
});

// function to get all answers
export const getAnswers = createAsyncThunk("get/answers", async () => {
  try {
    let answers: IanswerSchema[] = [];

    const res = await getDocs(query(collection(db, "answers")));
    res.docs.map((doc) => {
      const data = doc.data() as IanswerSchema;
      data.id = doc.id;
      answers.push(data);
    });
    return { answers };
  } catch (error) {
    toast.error("Oops! Failed to get answers...");
  }
});

// function to add new question to the database
export const addNewQuestion = createAsyncThunk(
  "/question/add",
  async (data: InewQuestionData) => {
    try {
      // for adding the question
      const qData: IquestionSchema = {
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        categoryName: data.categoryName,
      };
      const quesRes = await addDoc(collection(db, "questions"), {
        ...qData,
      });

      // for adding the answer
      const ansData: IanswerSchema = {
        correctOption: data.correctOption,
        description: data.description,
        qid: quesRes.id,
      };
      const ansRes = await addDoc(collection(db, "answers"), {
        ...ansData,
      });
      return { quesRes, ansRes };
    } catch (error) {
      toast.error("Oops! operation failed");
    }
  }
);

// function to delete a question from database
export const deleteQuestion = createAsyncThunk(
  "question/delete",
  async (data: { quesID: string; ansID: string }) => {
    try {
      const quesRes = await deleteDoc(doc(db, "questions", data.quesID));
      const ansRes = await deleteDoc(doc(db, "answers", data.ansID));
      return { quesRes, ansRes };
    } catch (error) {
      toast.error("Oops! operation failed");
    }
  }
);

// function to update the question in the database
export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (data: IupdateFunctionData) => {
    try {
      const quesDocRef = doc(db, "questions", data?.id);
      const ansDocRef = doc(db, "answers", data?.ansID);
      const quesData: IquestionSchema = {
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        categoryName: data.categoryName,
      };
      const ansData: IanswerSchema = {
        correctOption: data.correctOption,
        qid: data.id,
        description: data.description,
      };
      const quesRes = await updateDoc(quesDocRef, {
        ...quesData,
      });
      const ansRes = await updateDoc(ansDocRef, { ...ansData });

      return { quesRes, ansRes };
    } catch (error) {
      toast.error("Oops! operation failed");
    }
  }
);

// function to get random questions
export const getRandomQuestions = createAsyncThunk(
  "get/randomQuestions",
  async (data: { categoryName: string; length: number }) => {
    try {
      const res = await getDocs(
        query(
          collection(db, "questions"),
          where("categoryName", "==", data.categoryName)
        )
      );

      const allQuestions: IquestionSchema[] = [];
      res.docs.map((doc) => {
        const data = doc.data() as IquestionSchema;
        data.id = doc.id;
        allQuestions.push(data);
      });
      const randomQuestions = allQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, data.length);
      return randomQuestions;
    } catch (error) {
      toast.error("Oops! operation failed");
    }
  }
);

// function to get the answers of the random questions
export const getRandomQuesAnswers = createAsyncThunk(
  "/get/randomAnswers",
  async (data: IquestionSchema[]) => {
    try {
      let ans: IanswerSchema[] = [];
      await Promise.all(
        data.map(async (element) => {
          const res = await getDocs(
            query(collection(db, "answers"), where("qid", "==", element.id))
          );
          res.docs.map((doc) => {
            const data = doc.data() as IanswerSchema;
            ans = [...ans, data];
          });
        })
      );

      return ans;
    } catch (error) {
      toast.error("Oops! operation failed");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // for getQuestions
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        if (action.payload?.questions) {
          state.questions = action.payload?.questions;
          state.isLoading = false;
        }
      })
      .addCase(getQuestions.rejected, (state) => {
        state.isLoading = false;
      });

    // for getAnswers
    builder
      .addCase(getAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnswers.fulfilled, (state, action) => {
        if (action.payload?.answers) {
          state.answers = action.payload?.answers;
          state.isLoading = false;
        }
      })
      .addCase(getAnswers.rejected, (state) => {
        state.isLoading = false;
      });

    // for addNewQuestion
    builder
      .addCase(addNewQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewQuestion.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Question added successfully");
      })
      .addCase(addNewQuestion.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to add question");
      });

    // for delete question
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          toast.success("Question deleted successfully");
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("Failed to delete question");
      });

    // for update question
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Question updated successfully");
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to update the question");
      });

    // for get random question
    builder
      .addCase(getRandomQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload!;
      })
      .addCase(getRandomQuestions.rejected, (state) => {
        state.isLoading = false;
      });

    // for getting the random questions answers
    builder
      .addCase(getRandomQuesAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomQuesAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.answers = action.payload!;
      })
      .addCase(getRandomQuesAnswers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// exporting my reducers
export const {} = quizSlice.actions;

// exporting the slice reducer as deault
export default quizSlice.reducer;
