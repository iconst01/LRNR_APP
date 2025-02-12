import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";
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
    const navigate = useNavigate();

    const handleSubmit = () => {
        setShowEvaluation(true);
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer(""); // Clear input field
            setShowEvaluation(false); // Hide evaluation until next submit
        } else {
            navigate("/results");
        }
    };

    return (
        <div className="mainContainer">
            {/* Question Number */}
            <h3 className="center-align teal-text text-darken-5">
                {currentQuestion + 1} of {quizData.length}
            </h3>

            {/* Question container */}
            <div>
                <h4 className="teal-text text-darken-5">Question</h4>
                <p>{quizData[currentQuestion].question}</p>
            </div>

            {/* Answer Input */}
            <div className="section answerContainer">
                <div>
                    <h4 className="teal-text text-darken-5">Your Answer</h4>
                    <div className="input-field">
                        <input
                            id="answer"
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="validate"
                        />
                        <label htmlFor="answer" className={answer ? "active" : ""}>
                            Enter your answer
                        </label>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            {!showEvaluation && (
                <div className="section">
                    <button className="waves-effect waves-light teal darken-1 btn-large" onClick={handleSubmit}>
                        SUBMIT ANSWER
                    </button>
                </div>
            )}

            {/* Evaluation Section (Only Shows After Submission) */}
            {showEvaluation && (
                <div className="section evalContainer">
                    <h5 className="teal-text text-darken-2">Verner's Evaluation</h5>

                    <div className="evalContent">
                        {/* Left Side - Correct/Incorrect */}
                        <div className="evalLeft">
                            <p>
                                <strong>
                                    {answer.trim().toLowerCase() === quizData[currentQuestion].correctAnswer.toLowerCase()
                                        ? "Correct!"
                                        : "Incorrect"}
                                </strong>
                            </p>
                        </div>

                        {/* Right Side - Explanation */}
                        <div className="evalRight">
                            <p>{quizData[currentQuestion].evaluation}</p>
                        </div>
                    </div>

                    {/* Bottom Section - Next Button */}
                    <button className="waves-effect waves-light btn-large teal darken-1 nextBtn" onClick={handleNext}>
                        {currentQuestion < quizData.length - 1 ? "NEXT" : "FINISH"}
                    </button>
                </div>
            )}

        </div>
    );
};

export default QuizPage;



