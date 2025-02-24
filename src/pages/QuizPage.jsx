// Import necessary hooks, components, and libraries
import { useState, useEffect } from "react";
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

// Define the QuizPage component
const QuizPage = () => {
    // useLocation hook to access state passed from the previous component
    const location = useLocation();  
    // Destructure state to get questions, answers, and numberOfQuestions
    const { questions, answers, numberOfQuestions } = location.state || {}; 
    // State to store the user's current answer
    const [answer, setAnswer] = useState("");
    // State to track the current question index
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // State to toggle evaluation section visibility
    const [showEvaluation, setShowEvaluation] = useState(false);
    // State to store error messages
    const [error, setError] = useState(""); 
    // State to store evaluation text (correct/incorrect feedback)
    const [evaluationText, setEvaluationText] = useState(""); 
    // State to track all user answers
    const [userAnswers, setUserAnswers] = useState([]); 
    // State to track the number of correct answers
    const [correctCount, setCorrectCount] = useState(0);
    // State to track loading state
    const [isLoading, setIsLoading] = useState(false); 
    // useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();

    // useEffect to validate questions and answers data
    useEffect(() => {
        // If questions or answers are missing or empty, redirect to the quiz generation page
        if (!questions || questions.length === 0 || !answers || answers.length === 0) {
            navigate("/quiz-gen"); 
        }
    }, [questions, answers, navigate]);

    // Function to handle answer submission
    const handleSubmit = async () => {
        // Validate if the answer is empty
        if (!answer.trim()) {
            setError("Please enter an answer.");
            return; 
        }

        setIsLoading(true); // Set loading state to true
        // Get the correct answer for the current question
        const correctAnswer = answers[currentQuestion];
        // Check if the user's answer matches the correct answer (case-insensitive)
        const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

        // If the answer is correct
        try {
            if (isCorrect) {
                setCorrectCount(prev => prev + 1);
                setEvaluationText("Correct! Well done!");
            } else {
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
                const evaluation = result.response.text();
                setEvaluationText(`Incorrect!\n\n${evaluation}`);
            }

            setUserAnswers(prev => [...prev, { 
                question: questions[currentQuestion], 
                userAnswer: answer, 
                correctAnswer, 
                isCorrect 
            }]);
            setShowEvaluation(true);
            setError("");
        } catch (error) {
            console.error("Error generating evaluation:", error);
            setEvaluationText("Sorry, something went wrong while generating the evaluation. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle moving to the next question or navigating to results
    const handleNext = () => {
        // If there are more questions, move to the next question
        if (currentQuestion < numberOfQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer(""); // Clear the answer input
            setShowEvaluation(false); // Hide the evaluation section
            setEvaluationText(""); // Clear the evaluation text
        } else {
            // If it's the last question, navigate to the results page with userAnswers and correctCount
            navigate("/results", { state: { userAnswers, correctCount, totalQuestions: numberOfQuestions } });
        }
    };

    // Get the current question and correct answer
    const currentQuestionData = questions[currentQuestion];
    const correctAnswer = answers[currentQuestion];

    return (
        <div className="mainContainer">
            {/* Display the current question number */}
            <QuestionNumber current={currentQuestion} total={numberOfQuestions} />
            {/* Display the current question */}
            <QuestionContainer question={currentQuestionData} />
            {/* Input field for the user's answer */}
            <AnswerInput answer={answer} setAnswer={setAnswer} error={error} />

            {isLoading ? (
                <div className="section center-align" style={{ minHeight: '150px', marginTop: '20px' }}>
                    <SyncLoader color="#26a69a" size={20} margin={10} style={{  marginTop: '200px' }}/>
                    <p className="teal-text" style={{  marginTop: '20px' }}>
                        Evaluating your answer...
                    </p>
                    <p className="grey-text text-darken-1" style={{ 
                        marginTop: '10px', 
                        fontSize: '0.9em' 
                    }}>
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

// Export the QuizPage component as the default export
export default QuizPage;