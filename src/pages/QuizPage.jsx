import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import QuestionNumber from "../components/QuestionNumber";
import QuestionContainer from "../components/QuestionContainer";
import AnswerInput from "../components/AnswerInput";
import EvaluationSection from "../components/EvaluationSection";

const QuizPage = () => {
    const location = useLocation();  
    const { questions, answers, numberOfQuestions } = location.state || {}; 
    const [answer, setAnswer] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [error, setError] = useState(""); 
    const [evaluationText, setEvaluationText] = useState(""); 
    const navigate = useNavigate();

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

     
        const correctAnswer = answers[currentQuestion];
        if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setEvaluationText("Correct! Well done!");
            setShowEvaluation(true);
            setError("");
        } else {
           
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                if (!apiKey) {
                    console.error("API key is not defined");
                    setEvaluationText("Error: API key is missing.");
                    return;
                }

                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `The question is: "${questions[currentQuestion]}". The correct answer is: "${correctAnswer}". The user answered: "${answer}". Explain why the user's answer is incorrect and provide the correct reasoning. Be detailed and educational.`;

                const result = await model.generateContent(prompt);
                const evaluation = result.response.text();
                setEvaluationText(`Incorrect!\n\n${evaluation}`); // Add "Incorrect!" prefix
            } catch (error) {
                console.error("Error generating evaluation:", error);
                setEvaluationText("Sorry, something went wrong while generating the evaluation. Please try again.");
            } finally {
                setShowEvaluation(true);
                setError("");
            }
        }
    };

    const handleNext = () => {
        if (currentQuestion < numberOfQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setAnswer(""); 
            setShowEvaluation(false); 
            setEvaluationText("");
        } else {
            navigate("/results");
        }
    };

   
    const currentQuestionData = questions[currentQuestion];
    const correctAnswer = answers[currentQuestion];
    return (
        <div className="mainContainer">
          
            <QuestionNumber current={currentQuestion} total={numberOfQuestions} />

           
            <QuestionContainer question={currentQuestionData} />

            <AnswerInput answer={answer} setAnswer={setAnswer} error={error} />

            {!showEvaluation && (
                <div className="section">
                    <button className="waves-effect waves-light teal darken-1 btn-large" onClick={handleSubmit}>
                        SUBMIT ANSWER
                    </button>
                </div>
            )}

      
            {showEvaluation && (
                <EvaluationSection
                    answer={answer}
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