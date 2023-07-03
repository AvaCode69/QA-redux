import CreateQuestion from "./components/CreateQuestion";
import Questions from "./components/Questions";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((store) => store.QA);

  return (
    <main>
      <section className="container">
        <h1>The Awesome Q and A Tool</h1>
        <Questions />
        {isLoading ? (
          <div className="loading" style={{ marginTop: "6rem" }}></div>
        ) : null}

        <CreateQuestion />
      </section>
    </main>
  );
}
export default App;
