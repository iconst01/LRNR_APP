
import React from "react";

const EvaluationSection = ({ answer, correctAnswer, evaluation, handleNext, isLastQuestion }) => {
    return (
        <div className="evaluation-section">
            <h5>Your Answer: {answer}</h5>
            <h5>Correct Answer: {correctAnswer}</h5>
            <p>{evaluation}</p> {/* Display the evaluation explanation */}
            <button onClick={handleNext}>
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </button>
        </div>
    );
};
export default EvaluationSection;
