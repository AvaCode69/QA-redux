import React from "react";

const QuestionForm = ({
  inputValue,
  handleInputChange,
  handleSaveClick,
  error,
}) => {
  return (
    <div className="question-editItem">
      <input
        type="text"
        name="question"
        className="text-input"
        value={inputValue.question}
        onChange={handleInputChange}
      />
      <input
        type="text"
        className="text-input"
        name="answer"
        value={inputValue.answer}
        onChange={handleInputChange}
      />
      <button onClick={handleSaveClick} className="blue-btn">
        Save
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default QuestionForm;
