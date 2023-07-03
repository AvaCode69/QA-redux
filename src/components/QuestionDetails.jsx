import React from "react";

const QuestionDetails = ({
  inputValue,
  handleToggle,
  handleEditClick,
  handleDeleteClick,
  isActive,
}) => {
  return (
    <div>
      <div className="question-item">
        <span onClick={handleToggle}>{inputValue.question}</span>

        <div className="btn">
          <button onClick={handleEditClick} className="blue-btn">
            Edit
          </button>
          <button type="button" className="red-btn" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
      {isActive && <p>{inputValue.answer}</p>}
    </div>
  );
};

export default QuestionDetails;
