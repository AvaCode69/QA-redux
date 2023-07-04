import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemAsync } from "../features/question/questionSlice";
import CreateQuestionForm from "./CreateQuestionForm";

const CreateQuestion = () => {
  const { isLoading } = useSelector((store) => store.QA);
  const [state, setState] = useState({
    inputValue: { question, answer },
    error: "",
  });

  const dispatch = useDispatch();

  const handleQaChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      inputValue: { ...state.inputValue, [name]: value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if input values are empty or contain only whitespace
    if (
      state.inputValue.question.trim() === "" ||
      state.inputValue.answer.trim() === ""
    ) {
      setError("Please enter both a question and an answer.");
      return;
    }

    dispatch(
      addItemAsync({
        question: state.inputValue.question,
        answer: state.inputValue.answer,
      })
    )
      .then(() => {
        setState({ question: "", answer: "", error: "" });
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        setState({
          ...state,
          error: "Error adding item. Please try again.",
        });
      });
  };

  useEffect(() => {
    if (state.error) {
      setTimeout(() => {
        setState({
          ...state,
          error: "",
        });
      }, 3000);
    }
  }, [state.error]);

  return (
    <CreateQuestionForm
      handleSubmit={handleSubmit}
      question={state.question}
      handleQaChange={handleQaChange}
      answer={state.answer}
      error={state.error}
      isLoading={state.isLoading}
    />
  );
};

export default CreateQuestion;
