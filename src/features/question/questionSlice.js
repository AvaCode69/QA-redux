import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

let defaultList = [];
try {
  defaultList = JSON.parse(localStorage.getItem("list")) || [];
} catch (error) {
  console.error("Error parsing localStorage data:", error);
}

const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const initialState = {
  questionItems: defaultList || [],
  isLoading: false,
  activeId: null,
};

const addItemAsync = createAsyncThunk(
  "QA/addItem",
  async (payload, { getState }) => {
    const { question, answer } = payload;
    const newQuestion = {
      question,
      answer,
      id: nanoid(),
    };
    const newQuestionItems = [...getState().QA.questionItems, newQuestion];

    // Simulating an API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
    deleteQuestion: (state, action) => {
      const id = action.payload;
      state.questionItems = state.questionItems.filter(
        (item) => item.id !== id
      );
      setLocalStorage(state.questionItems);
    },
    editQuestion: (state, action) => {
      const { id, inputValue } = action.payload;
      const questionItem = state.questionItems.find((item) => item.id === id);
      if (questionItem) {
        questionItem.question = inputValue.question;
        questionItem.answer = inputValue.answer;
      }
      setLocalStorage(state.questionItems);
    },
    toggleQuestion: (state, action) => {
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

export const {
  addItem,
  toggleQuestion,
  removeAll,
  sort,
  deleteQuestion,
  editQuestion,
} = questionSlice.actions;

export { addItemAsync };

export default questionSlice.reducer;
