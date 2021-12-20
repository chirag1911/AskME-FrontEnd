import React, { createContext, useEffect, useState } from "react";
import axios from "../../../axios";

export const QuestionsContext = createContext();

export const QuestionsContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/questions/all", {
      params: { skip: skip },
    });
    const status = data.status;
    if (status === "SUCCESS") {
      const questions = data.data.questions;
      setQuestions(questions);
    } else {
      setError(data.error);
    }
    setIsLoading(false);
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        isLoading,
        error,
        fetchQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};
