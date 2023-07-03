import { useDispatch, useSelector } from "react-redux";
import {
  toggleQuestion,
  deleteQuestion,
  editQuestion,
} from "../features/question/questionSlice";
import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import QuestionDetails from "./QuestionDetails";

const SingleQuestion = ({ id, question, answer, activeId }) => {
  const isActive = id === activeId;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isOpen: isActive,
    editing: false,
    inputValue: { question, answer },
    error: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      inputValue: { ...state.inputValue, [name]: value },
    });
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
    dispatch(editQuestion({ id, inputValue: state.inputValue }));
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
