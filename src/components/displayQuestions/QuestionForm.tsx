import React, { ChangeEvent } from "react";

interface QuestionFormProps {
  inputValue: { question: string; answer: string };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSaveClick: () => void;
  handleToggle: () => void;
  isActive: boolean;
  error: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  inputValue,
  handleInputChange,
  handleSaveClick,
  handleToggle,
  isActive,
  error,
}) => {
  return (
    <>
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
    </>
  );
};

export default QuestionForm;
