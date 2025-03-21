import React from "react";
function AnswerInput({ answer, setAnswer, error }) {
    return (
        <div className="section answerContainer">
            <div>
                <h4 style={{color: "#22C2C6"}}>Your Answer</h4>
                <div className="input-field">
                    <input
                        id="answer"
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className={`validate ${error ? "invalid" : ""}`}
                    />
                    <label htmlFor="answer" className={answer ? "active" : ""}>
                        Enter your answer
                    </label>
                    {error && <span className="helper-text red-text">{error}</span>}
                </div>
            </div>
        </div>
    );
}

export default AnswerInput;