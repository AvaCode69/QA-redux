import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemAsync } from "../features/question/questionSlice";
import { FaInfoCircle } from "react-icons/fa";

const CreateQuestion = () => {
  const { isLoading } = useSelector((store) => store.QA);
  const [createQa, setCreateQa] = useState({ question: "", answer: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleQaChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateQa({ ...createQa, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if input values are empty or contain only whitespace
    if (createQa.question.trim() === "" || createQa.answer.trim() === "") {
      setError("Please enter both a question and an answer.");
      return;
    }

    dispatch(
      addItemAsync({ question: createQa.question, answer: createQa.answer })
    )
      .then(() => {
        setCreateQa({ question: "", answer: "" });
        setError("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        setError("Error adding item. Please try again.");
      });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <form className="create-question" onSubmit={handleSubmit}>
      <div className="title-box">
        <h4>Create A New Question</h4>

        <span className="tooltip">
          <FaInfoCircle />
          <span id="bottom" className="tooltiptext">
            You can Create your Question and Answer here
          </span>
        </span>
      </div>
      <div className="form-control">
        <label>Question</label>
        <input
          type="text"
          name="question"
          value={createQa.question}
          onChange={handleQaChange}
        />
      </div>
      <div className="form-control">
        <label>Answer</label>
        <input
          type="text"
          name="answer"
          value={createQa.answer}
          onChange={handleQaChange}
        />
      </div>
      {error && <p className="error">{error}</p>}

      <button type="submit" className="succeed-btn" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Question"}
      </button>
    </form>
  );
};

export default CreateQuestion;
