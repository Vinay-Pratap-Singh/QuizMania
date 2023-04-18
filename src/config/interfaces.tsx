// for adding the question
export interface InewQuestionData {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  categoryName: string;
  description: string;
}

// for storing the question
export interface ImyQuestionData {
  id?: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  categoryName: string;
  description: string;
}

// for single question
export interface IquestionSchema {
  id?: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  categoryName: string;
}

// for single answers
export interface IanswerSchema {
  id?: string;
  qid: string;
  description: string;
  correctOption: string;
}

// for storing quizSlice data
export interface IquizSliceState {
  questions: IquestionSchema[];
  answers: IanswerSchema[];
  isLoading: boolean;
}

export interface IinitialStateUserData {
  email: string;
  name: string;
  role: string[];
  quizAttempted: number;
  passed: number;
  failed: number;
}
// for initial state of user slice
export interface IinitialStateUser {
  data: IinitialStateUserData[];
  isLoading: boolean;
}
