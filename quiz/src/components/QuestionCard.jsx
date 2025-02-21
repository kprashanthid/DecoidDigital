import { useState, useEffect } from "react";

function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [question]);

  const handleAnswer = (index) => {
    setSelected(index);
    const isCorrect = index === question.answer;
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");

    setTimeout(() => {
      setFeedback(null);
      onAnswer(index);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg text-center">
      {/* <h2 className="text-xl font-bold">{question.question}</h2> */}
      <div className="mt-4 flex flex-col gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`px-4 py-2 rounded-md transition ${
              selected === index
                ? index === question.answer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
    </div>
  );
}

export default QuestionCard;
