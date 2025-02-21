import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";
import { useEffect, useState } from "react";

function Results() {
  const { questions, userAnswers, resetQuiz } = useQuizStore();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const dbRequest = indexedDB.open("QuizDB", 1);
    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      const transaction = db.transaction("history", "readonly");
      const store = transaction.objectStore("history");
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => {
        setHistory(getAllRequest.result);
      };
    };
  }, []);

  const score = userAnswers.filter(
    (ans, index) => ans === questions[index].answer
  ).length;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Quiz Completed!</h1>
        <p className="text-lg font-semibold">
          Your Score:{" "}
          <span
            className={`px-4 py-2 rounded-md text-white font-bold ${
              score >= questions.length / 2 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {score} / {questions.length}
          </span>
        </p>

        <button
          onClick={() => {
            resetQuiz();
            navigate("/");
          }}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          🔄 Try Again
        </button>
        {history.length > 0 && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              📜 Past Attempts
            </h2>
            <div className="max-h-40 overflow-auto">
              {history.map((attempt, i) => (
                <div
                  key={i}
                  className="p-2 border-b text-gray-700 text-sm bg-gray-50 rounded-md mb-2 shadow-sm"
                >
                  <p>
                    Attempt {i + 1}: {attempt.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
