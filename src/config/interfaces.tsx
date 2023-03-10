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
  id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctOption: string;
  categoryName: string;
  description: string;
}

// for storing quizSlice data
export interface IquizSliceState {
  questions: ImyQuestionData[];
}
