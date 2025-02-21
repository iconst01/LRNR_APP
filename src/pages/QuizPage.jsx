import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";
import QuestionContainer from "../components/QuestionContainer";
import AnswerInput from "../components/AnswerInput";
import QuestionNumber from "../components/QuestionNumber";
import EvaluationSection from "../components/EvaluationSection";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

const quizData = [
    {
        question: "Can you explain what JavaScript is and how it is used to add interactivity to websites?",
        correctAnswer: "JavaScript is a programming language used to add interactivity to websites by handling events, manipulating HTML & CSS, and modifying the DOM.",
        evaluation: "Incorrect. The answer only mentions one aspect of JavaScript - accessing the DOM. A complete answer should mention its ability to handle events, manipulate HTML and CSS, and perform various other functions.",
    },
    {
        question: "What is the difference between 'let', 'const', and 'var' in JavaScript?",
        correctAnswer: "let and const are block-scoped, while var is function-scoped. const cannot be reassigned, whereas let can.",
        evaluation: "Correct! 'let' and 'const' are block-scoped, but 'const' cannot be reassigned. 'var' is function-scoped and can be redeclared.",
    },
    {
        question: "What is the purpose of React's useState hook?",
        correctAnswer: "useState is a React hook that allows functional components to have state and update it dynamically.",
        evaluation: "Incorrect. The correct answer is that useState allows functional components to have state and update it dynamically.",
    },
    {
        question: "What is the Virtual DOM in React, and why is it important?",
        correctAnswer: "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize UI rendering and improve performance.",
        evaluation: "Incorrect. The Virtual DOM is an optimized representation of the real DOM, used by React to reduce unnecessary re-renders and improve performance.",
    },
    {
        question: "What is an API, and how is it used in web development?",
        correctAnswer: "An API (Application Programming Interface) allows applications to communicate and exchange data with external services.",
        evaluation: "Incorrect. An API enables different applications to interact with each other by sending and receiving data, often through HTTP requests.",
    }
];

function QuizPage() {
    const [answer, setAnswer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const trimmedAnswer = answer.trim();

        if (!trimmedAnswer) {
            setError("Please enter an answer before submitting.");
            return;
        }

        if (trimmedAnswer.length < 3) {
            setError("Answer must be at least 3 characters long.");
            return;
        }

        if (trimmedAnswer.length > 300) {
            setError("Answer must not exceed 300 characters.");
            return;
        }
        else{
            setError(""); 
            setShowEvaluation(true);
        }
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer(""); 
            setShowEvaluation(false);
            setError("");
        } else {
            navigate("/results");
        }
    };

    return (
        <div className="mainContainer">
            <QuestionNumber current={currentQuestion} total={quizData.length} />
            <QuestionContainer question={quizData[currentQuestion].question} />
            <AnswerInput answer={answer} setAnswer={setAnswer} error={error} />
            
            {!showEvaluation ? (
                <div className="section">
                    <button className="waves-effect waves-light teal darken-1 btn-large" onClick={handleSubmit}>
                        SUBMIT ANSWER
                    </button>
                </div>
            ) : (
                <EvaluationSection 
                    answer={answer} 
                    correctAnswer={quizData[currentQuestion].correctAnswer} 
                    evaluation={quizData[currentQuestion].evaluation} 
                    handleNext={handleNext} 
                    isLastQuestion={currentQuestion === quizData.length - 1} 
                />
            )}
        </div>
    );
}

export default QuizPage;



