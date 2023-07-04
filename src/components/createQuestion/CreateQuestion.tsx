import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemAsync } from "../../features/question/questionSlice";
import CreateQuestionForm from "./CreateQuestionForm";
import { RootState } from "../../store";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

const CreateQuestion = () => {
  const { isLoading } = useSelector((store: RootState) => store.QA);
  const [state, setState] = useState<{
    inputValue: { question: string; answer: string };
    error: string;
  }>({
    inputValue: { question: "", answer: "" },
    error: "",
  });
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const handleQaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      inputValue: { ...prevState.inputValue, [name]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if input values are empty or contain only whitespace
    if (
      state.inputValue.question.trim() === "" ||
      state.inputValue.answer.trim() === ""
    ) {
      setState((prevState) => ({
        ...prevState,
        error: "Please enter both a question and an answer.",
      }));
      return;
    }

    dispatch(
      addItemAsync({
        question: state.inputValue.question,
        answer: state.inputValue.answer,
      })
    );

    setState((prevState) => ({
      inputValue: { question: "", answer: "" },
      error: "",
    }));
  };

  useEffect(() => {
    if (state.error) {
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          error: "",
        }));
      }, 3000);
    }
  }, [state.error]);

  return (
    <CreateQuestionForm
      handleSubmit={handleSubmit}
      question={state.inputValue.question}
      handleQaChange={handleQaChange}
      answer={state.inputValue.answer}
      error={state.error}
      isLoading={isLoading}
    />
  );
};

export default CreateQuestion;
