import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import quizReducer from "./QuizSlice";
import CategorySlice from "./CategorySlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: AuthSlice,
    category: CategorySlice,
    user: UserSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
