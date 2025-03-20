import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import "../styles/QuizPage.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import QuestionNumber from "../components/QuestionNumber";
import QuestionContainer from "../components/QuestionContainer";
import AnswerInput from "../components/AnswerInput";
import EvaluationSection from "../components/EvaluationSection";
import { updateXP, updateStreak } from "../utils/badgeSystem";
import { UserContext } from "../context/UserProvider";

const QuizPage = () => {
  const location = useLocation();
  const { questions, answers, numberOfQuestions } = location.state || {};
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [error, setError] = useState("");
  const [evaluationText, setEvaluationText] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [generalAnswers, setGeneralAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (
      !questions ||
      questions.length === 0 ||
      !answers ||
      answers.length === 0
    ) {
      navigate("/quiz-gen");
    }
  }, [questions, answers, navigate]);

  const normalizeAnswer = (answer) => {
    return answer
      .toLowerCase()
      .replace(/[^\w\s'-]/g, "") // Remove special characters
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  };

  const extractKeywords = (answer) => {
    return answer.match(/\b[\w'-]+\b/g) || [];
  };

  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);

    // Allowing for some flexibility in the answer matching
    const userKeywords = extractKeywords(normalizedUserAnswer);
    const correctKeywords = extractKeywords(normalizedCorrectAnswer);

    // Adjust the keyword match logic to be more lenient
    const matchedKeywords = userKeywords.filter((keyword) =>
      correctKeywords.includes(keyword)
    );
    const accuracy = matchedKeywords.length / correctKeywords.length;

    // Check if the answer matches 80% or more of the correct answer, or if it's slightly different
    if (accuracy >= 0.2) {
      return true; // Major part of the answer matches, so it's considered correct
    }

    // Additional lenient check: if user’s answer conveys the right meaning despite slight differences (like typos or rephrasing)
    // This part allows for minor differences like synonyms or slight word changes
    const isSlightlyCorrect =
      userKeywords.some((keyword) =>
        normalizedCorrectAnswer.includes(keyword)
      ) || normalizedUserAnswer.includes(normalizedCorrectAnswer);

    return isSlightlyCorrect;
  };

  //   const handleSubmit = async () => {
  //     if (!answer.trim()) {
  //       setError("Please enter an answer.");
  //       return;
  //     }

  //     setIsLoading(true);
  //     const correctAnswer = answers[currentQuestion];
  //     const isCorrect = isAnswerCorrect(answer, correctAnswer);
  //     const updatedUser = user ? { ...user } : null;

  //     if (isCorrect) {
  //       setCorrectCount((prev) => prev + 1);
  //       setEvaluationText("Correct! Well done!");

  //       if (user.customTopic) {
  //         updateXP(updatedUser, 10, user.topic);
  //       } else {
  //         updateXP(updatedUser, 10, user.customTopic);
  //       }

  //       updateStreak(updatedUser);
  //       if (user) {
  //         setUser(updatedUser);
  //       }
  //     } else {
  //       updateStreak(updatedUser, false);
  //       if (user) {
  //         setUser(updatedUser);
  //       }
  //     }

  //     if (user) {
  //       setUserAnswers((prev) => [
  //         ...prev,
  //         {
  //           question: questions[currentQuestion],
  //           userAnswer: answer,
  //           correctAnswer,
  //           isCorrect,
  //         },
  //       ]);
  //     }

  //     setGeneralAnswers((prev) => [
  //       ...prev,
  //       {
  //         question: questions[currentQuestion],
  //         userAnswer: answer,
  //         correctAnswer,
  //         isCorrect,
  //       },
  //     ]);

  //     // If the answer is incorrect, call the API for the evaluation
  //     if (!isCorrect) {
  //       try {
  //         const apiKey = import.meta.env.VITE_API_KEY;
  //         if (!apiKey) {
  //           console.error("API key is not defined");
  //           setEvaluationText("Error: API key is missing.");
  //           setIsLoading(false);
  //           return;
  //         }

  //         const genAI = new GoogleGenerativeAI(apiKey);
  //         const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //         const prompt = `The question is: "${questions[currentQuestion]}".
  //                 The correct answer is: "${correctAnswer}".
  //                 The user answered: "${answer}".
  //                 ### Evaluation Criteria:
  //                 1. If the user's answer has spelling errors, singular/plural differences, or slight wording changes, **DO NOT** mark it as incorrect but instead award the user with a point.
  //                 2. If the answer is incorrect or significantly different, explain why and provide the correct reasoning in a **supportive** way.`;

  //         const result = await model.generateContent(prompt);
  //         const response =
  //           result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

  //         if (!response) {
  //           setEvaluationText(
  //             "Sorry, no evaluation was generated. Please try again."
  //           );
  //         } else {
  //           setEvaluationText(response);
  //         }
  //       } catch (error) {
  //         console.error("Error generating evaluation:", error);
  //         setEvaluationText(
  //           "Sorry, something went wrong while generating the evaluation. Please try again."
  //         );
  //       }
  //     }

  //     setShowEvaluation(true);
  //     setError("");
  //     setIsLoading(false);
  //   };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError("Please enter an answer.");
      return;
    }

    setIsLoading(true);
    const correctAnswer = answers[currentQuestion];
    const isCorrect = isAnswerCorrect(answer, correctAnswer);

    // Track the answer for both logged-in users and guests
    const answerData = {
      question: questions[currentQuestion],
      userAnswer: answer,
      correctAnswer,
      isCorrect,
    };

    // Add to general answers list (for all users)
    setGeneralAnswers((prev) => [...prev, answerData]);

    // Handle logged-in user specific functionality
    if (user) {
      // Clone user to avoid direct mutation
      const updatedUser = { ...user };

      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);

        // Determine which topic to use for XP update
        const topicToUpdate = updatedUser.customTopic
          ? updatedUser.customTopic
          : updatedUser.topic;
        updateXP(updatedUser, 10, topicToUpdate);
        updateStreak(updatedUser, true);
      } else {
        updateStreak(updatedUser, false);
      }

      // Update user state with changes
      setUser(updatedUser);

      // Track answer history for logged-in users
      setUserAnswers((prev) => [...prev, answerData]);
    }

    // Set feedback message for correct answers
    if (isCorrect) {
      setEvaluationText("Correct! Well done!");
    }
    // For incorrect answers, call the API for evaluation
    else {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        if (!apiKey) {
          console.error("API key is not defined");
          setEvaluationText("Error: API key is missing.");
          setIsLoading(false);
          return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `The question is: "${questions[currentQuestion]}".  
                The correct answer is: "${correctAnswer}".  
                The user answered: "${answer}".  
                ### Evaluation Criteria: 
                1. If the user's answer has spelling errors, singular/plural differences, or slight wording changes, **DO NOT** mark it as incorrect but instead award the user with a point.
                2. If the answer is incorrect or significantly different, explain why and provide the correct reasoning in a **supportive** way.`;

        const result = await model.generateContent(prompt);
        const response =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!response) {
          setEvaluationText(
            "Sorry, no evaluation was generated. Please try again."
          );
        } else {
          setEvaluationText(response);
        }
      } catch (error) {
        console.error("Error generating evaluation:", error);
        setEvaluationText(
          "Sorry, something went wrong while generating the evaluation. Please try again."
        );
      }
    }

    setShowEvaluation(true);
    setError("");
    setIsLoading(false);
  };

  const handleNext = () => {
    if (currentQuestion < numberOfQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
      setShowEvaluation(false);
      setEvaluationText("");
      setError("");
    } else {
      navigate("/results", {
        state: {
          generalAnswers,
          userAnswers,
          correctCount,
          totalQuestions: numberOfQuestions,
        },
      });
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const correctAnswer = answers[currentQuestion];

  return (
    <div className="mainContainer">
      <QuestionNumber current={currentQuestion} total={numberOfQuestions} />
      <QuestionContainer question={currentQuestionData} />
      <AnswerInput answer={answer} setAnswer={setAnswer} error={error} />

      {isLoading ? (
        <div
          className="section center-align"
          style={{ minHeight: "150px", marginTop: "20px" }}
        >
          <SyncLoader
            color="#26a69a"
            size={20}
            margin={10}
            style={{ marginTop: "200px" }}
          />
          <p className="teal-text" style={{ marginTop: "20px" }}>
            Evaluating your answer...
          </p>
          <p
            className="grey-text text-darken-1"
            style={{ marginTop: "10px", fontSize: "0.9em" }}
          >
            Please wait while we analyze your response
          </p>
        </div>
      ) : !showEvaluation ? (
        <div className="section">
          <button
            className="waves-effect waves-light teal darken-1 btn-large"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            SUBMIT ANSWER
          </button>
        </div>
      ) : (
        <EvaluationSection
          correctAnswer={correctAnswer}
          evaluation={evaluationText}
          handleNext={handleNext}
          isLastQuestion={currentQuestion === numberOfQuestions - 1}
        />
      )}
    </div>
  );
};

export default QuizPage;
