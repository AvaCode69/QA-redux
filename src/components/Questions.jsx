import React from "react";
import SingleQuestion from "./SingleQuestion";
import { useSelector, useDispatch } from "react-redux";
import { removeAll, sort } from "../features/question/questionSlice";
import { FaInfoCircle } from "react-icons/fa";

const Questions = () => {
  const dispatch = useDispatch();
  const { questionItems, activeId } = useSelector((store) => store.QA);
  return (
    <div className="created-question">
      <div className="title-box">
        <h4> Created Questions</h4>

        <span className="tooltip">
          <FaInfoCircle />
          <span id="bottom" class="tooltiptext">
            You can find Created Questions and Answers here
          </span>
        </span>
      </div>
      {questionItems.map((question) => {
        return (
          <SingleQuestion key={question.id} {...question} activeId={activeId} />
        );
      })}
      <button
        type="button"
        className="blue-btn"
        onClick={() => dispatch(sort())}
      >
        Sort Question
      </button>
      <button
        type="button"
        className="red-btn"
        onClick={() => dispatch(removeAll())}
      >
        Remove All Question
      </button>
    </div>
  );
};

export default Questions;
