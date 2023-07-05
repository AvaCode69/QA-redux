import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface QuestionItem {
  question: string;
  answer: string;
  id: string;
}

interface QAState {
  questionItems: QuestionItem[];
  isLoading: boolean;
  activeId: string | null;
}

const defaultList: QuestionItem[] = (() => {
  try {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return [];
  }
})();

const setLocalStorage = (items: QuestionItem[]) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const initialState: QAState = {
  questionItems: defaultList,
  isLoading: false,
  activeId: null,
};

const addItemAsync = createAsyncThunk(
  "QA/addItem",
  async (payload: { question: string; answer: string }, { getState }) => {
    const { question, answer } = payload;
    const newQuestion: QuestionItem = {
      question,
      answer,
      id: nanoid(),
    };

    const state = getState() as { QA: QAState };

    const newQuestionItems = [...state.QA.questionItems, newQuestion];

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLocalStorage(newQuestionItems);
    return newQuestion;
  }
);

const questionSlice = createSlice({
  name: "QA",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.questionItems = [];
      setLocalStorage(state.questionItems);
    },
    sort: (state) => {
      state.questionItems.sort((a, b) => a.question.localeCompare(b.question));
      setLocalStorage(state.questionItems);
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.questionItems = state.questionItems.filter(
        (item) => item.id !== id
      );
      setLocalStorage(state.questionItems);
    },
    editQuestion: (
      state,
      action: PayloadAction<{ id: string; inputValue: QuestionItem }>
    ) => {
      const { id, inputValue } = action.payload;
      const questionItem = state.questionItems.find((item) => item.id === id);
      if (questionItem) {
        questionItem.question = inputValue.question;
        questionItem.answer = inputValue.answer;
      }
      setLocalStorage(state.questionItems);
    },
    toggleQuestion: (state, action: PayloadAction<string>) => {
      const newActiveId =
        action.payload === state.activeId ? null : action.payload;
      state.activeId = newActiveId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionItems.push(action.payload);
      })
      .addCase(addItemAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { removeAll, sort, deleteQuestion, editQuestion, toggleQuestion } =
  questionSlice.actions;

export { addItemAsync };

export default questionSlice.reducer;
