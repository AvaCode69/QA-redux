import { configureStore } from "@reduxjs/toolkit";
import newQuestionReducer from "./features/question/questionSlice";

export const store = configureStore({
  reducer: {
    QA: newQuestionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
