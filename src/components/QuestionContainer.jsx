import React from "react";
function QuestionContainer({question}) {
    return (
        <div>
            <h4 style={{color: "#22C2C6"}}>Question</h4>
            <p>{question}</p>
        </div>
    );
};

export default QuestionContainer;