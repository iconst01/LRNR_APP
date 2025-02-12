import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/QuizPage.css";
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



