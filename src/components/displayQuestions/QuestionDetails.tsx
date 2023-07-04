import React from "react";

interface QuestionDetailsProps {
  inputValue: { question: string; answer: string };
  handleToggle: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  isActive: boolean;
}

const QuestionDetails: React.FC<QuestionDetailsProps> = ({
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
