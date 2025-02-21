import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz!</h1>
      <button
        onClick={() => navigate("/quiz")}
        className="px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
