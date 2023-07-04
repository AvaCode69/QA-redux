import CreateQuestion from "./components/createQuestion/CreateQuestion";
import QuestionsContainer from "./components/displayQuestions/QuestionsContainer";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import React from "react";

function App() {
  const { isLoading } = useSelector((store: RootState) => store.QA);

  return (
    <main>
      <section className="container">
        <h1>The Awesome Q and A Tool</h1>
        <QuestionsContainer />
        {isLoading ? (
          <div className="loading" style={{ marginTop: "6rem" }}></div>
        ) : null}
        <CreateQuestion />
      </section>
    </main>
  );
}

export default App;
