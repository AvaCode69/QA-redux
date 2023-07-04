import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const CreateQuestionForm = ({
  handleSubmit,
  question,
  handleQaChange,
  answer,
  error,
  isLoading,
}) => {
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
          value={question}
          onChange={handleQaChange}
        />
      </div>
      <div className="form-control">
        <label>Answer</label>
        <input
          type="text"
          name="answer"
          value={answer}
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

export default CreateQuestionForm;
