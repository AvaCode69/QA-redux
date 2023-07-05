import { useDispatch, useSelector } from "react-redux";
import {
  toggleQuestion,
  deleteQuestion,
  editQuestion,
} from "../../features/question/questionSlice";
import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionDetails from "./QuestionDetails";
import React from "react";

interface SingleQuestionProps {
  id: string;
  question: string;
  answer: string;
  activeId: string | null;
}

const SingleQuestion: React.FC<SingleQuestionProps> = ({
  id,
  question,
  answer,
  activeId,
}) => {
  const isActive = id === activeId;
  const dispatch = useDispatch();
  const [state, setState] = useState<{
    isOpen: boolean;
    editing: boolean;
    inputValue: { question: string; answer: string; id: string };
    error: string;
  }>({
    isOpen: isActive,
    editing: false,
    inputValue: { question, answer, id },
    error: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length === 0 || value[0] !== " ") {
      setState({
        ...state,
        inputValue: { ...state.inputValue, [name]: value },
      });
    }
  };

  const handleEditClick = () => {
    setState({ ...state, editing: true });
  };

  const handleSaveClick = () => {
    const { question, answer } = state.inputValue;
    if (question.trim() === "" || answer.trim() === "") {
      setState({ ...state, error: "Please enter text" });
      return;
    }
    dispatch(editQuestion({ id: id, inputValue: state.inputValue }));
    setState({ ...state, editing: false });
  };

  const handleToggle = () => {
    setState({ ...state, isOpen: !state.isOpen });
    dispatch(toggleQuestion(id));
  };

  useEffect(() => {
    if (state.error) {
      const timeout = setTimeout(() => {
        setState({ ...state, error: "" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [state.error]);

  return (
    <section className="question">
      {state.editing ? (
        <QuestionForm
          inputValue={state.inputValue}
          handleInputChange={handleInputChange}
          handleSaveClick={handleSaveClick}
          error={state.error}
          handleToggle={handleToggle}
          isActive={isActive}
        />
      ) : (
        <>
          <QuestionDetails
            handleToggle={handleToggle}
            handleEditClick={handleEditClick}
            handleDeleteClick={() => dispatch(deleteQuestion(id))}
            isActive={isActive}
            inputValue={state.inputValue}
          />
        </>
      )}
    </section>
  );
};

export default SingleQuestion;
