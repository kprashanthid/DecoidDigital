export const saveQuizHistory = async (userAnswers) => {
  const dbRequest = indexedDB.open("QuizDB", 1);
  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains("history")) {
      db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
    }
  };

  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const transaction = db.transaction("history", "readwrite");
    const store = transaction.objectStore("history");
    store.add({ answers: userAnswers, date: new Date().toISOString() });
  };
};
