// Import necessary hooks, components, and libraries
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import "../styles/QuizPage.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google's Generative AI library
import QuestionNumber from "../components/QuestionNumber"; // Component to display question number
import QuestionContainer from "../components/QuestionContainer"; // Component to display the question
import AnswerInput from "../components/AnswerInput"; // Component for user input
import EvaluationSection from "../components/EvaluationSection"; // Component to display evaluation results
import { UserContext } from "../context/UserProvider";
import { updateXP, updateStreak } from "../utils/badgeSystem";

// Define the QuizPage component
const QuizPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    
    const { questions, answers, numberOfQuestions } = location.state || {};
    const [answer, setAnswer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [error, setError] = useState("");
    const [evaluationText, setEvaluationText] = useState("");
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!questions || questions.length === 0 || !answers || answers.length === 0) {
            navigate("/quiz-gen");
        }
    }, [questions, answers, navigate]);

    const handleSubmit = async () => {
        if (!answer.trim()) {
            setError("Please enter an answer.");
            return;
        }

        setIsLoading(true);
        const correctAnswer = answers[currentQuestion];
        const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
        const updatedUser = { ...user };

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setEvaluationText("Correct! Well done!");

            if (!user.customTopic) {
                updateXP(updatedUser, 10, user.topic);
            } else {
                updateXP(updatedUser, 10, user.customTopic);
            }

            updateStreak(updatedUser);
            setUser(updatedUser);
        } else {
            updateStreak(updatedUser, false);
            setUser(updatedUser);

            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                if (!apiKey) {
                    console.error("API key is not defined");
                    setEvaluationText("Error: API key is missing.");
                    return;
                }

                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `The question is: "${questions[currentQuestion]}". The correct answer is: "${correctAnswer}". The user answered: "${answer}". Explain why the user's answer is incorrect and provide the correct reasoning.`;

                const result = await model.generateContent(prompt);
                const evaluation = await result.response.text();
                setEvaluationText(`Incorrect!\n\n${evaluation}`);
            } catch (error) {
                console.error("Error generating evaluation:", error);
                setEvaluationText("Sorry, something went wrong while generating the evaluation. Please try again.");
            }
        }

        setUserAnswers(prev => [
            ...prev,
            {
                question: questions[currentQuestion],
                userAnswer: answer,
                correctAnswer,
                isCorrect,
            }
        ]);
        
        setShowEvaluation(true);
        setError("");
        setIsLoading(false);
    };

    const handleNext = () => {
        if (currentQuestion < numberOfQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
            setAnswer("");
            setShowEvaluation(false);
            setEvaluationText("");
        } else {
            navigate("/results", { state: { userAnswers, correctCount, totalQuestions: numberOfQuestions } });
        }
    };

    const currentQuestionData = questions[currentQuestion];

    return (
        <div className="mainContainer">
            <QuestionNumber current={currentQuestion} total={numberOfQuestions} />
            <QuestionContainer question={currentQuestionData} />
            <AnswerInput answer={answer} setAnswer={setAnswer} error={error} />

            {isLoading ? (
                <div className="section center-align" style={{ minHeight: '150px', marginTop: '20px' }}>
                    <SyncLoader color="#26a69a" size={20} margin={10} />
                    <p className="teal-text" style={{ marginTop: '20px' }}>
                        Evaluating your answer...
                    </p>
                    <p className="grey-text text-darken-1" style={{ marginTop: '10px', fontSize: '0.9em' }}>
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
                    correctAnswer={answers[currentQuestion]}
                    evaluation={evaluationText}
                    handleNext={handleNext}
                    isLastQuestion={currentQuestion === numberOfQuestions - 1}
                />
            )}
        </div>
    );
};

export default QuizPage;
