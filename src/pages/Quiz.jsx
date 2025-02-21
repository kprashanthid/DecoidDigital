import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";
import QuestionCard from "../components/QuestionCard";

function Quiz() {
  const { questions, setAnswer } = useQuizStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [inputAnswer, setInputAnswer] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      handleAutoSubmit();
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion]);

  const handleAutoSubmit = () => {
    if (questions[currentQuestion].type === "integer") {
      checkIntegerAnswer();
    } else {
      nextQuestion();
    }
  };

  const checkIntegerAnswer = () => {
    if (inputAnswer === "") return;

    const isCorrect = Number(inputAnswer) === questions[currentQuestion].answer;

    setAnswer(currentQuestion, Number(inputAnswer));

    if (!isCorrect) {
      setError("Incorrect answer!");
      setTimeout(() => {
        setError(null);
        nextQuestion();
      }, 1000);
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setError(null);
    setInputAnswer("");

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      navigate("/results");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-900 py-8 px-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold w-96">
          {questions[currentQuestion].question}
        </h2>
        {questions[currentQuestion].type === "mcq" ? (
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={(answer) => {
              setAnswer(currentQuestion, answer);
              nextQuestion();
            }}
          />
        ) : (
          <div className="mt-4">
            <input
              type="number"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              className={`w-full p-3 text-lg border rounded-md text-center ${
                error ? "border-red-500 animate-shake" : "border-gray-300"
              }`}
            />
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

            <button
              onClick={checkIntegerAnswer}
              disabled={inputAnswer === ""}
              className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              Submit
            </button>
          </div>
        )}

        <p className="mt-6 text-lg font-semibold bg-gray-100 text-gray-800 py-2 px-4 rounded-md shadow">
          ⏳ Time Left: <span className="text-red-500">{timeLeft}s</span>
        </p>
      </div>
    </div>
  );
}

export default Quiz;
