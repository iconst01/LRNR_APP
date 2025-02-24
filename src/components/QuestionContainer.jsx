import React from "react";
function QuestionContainer({question}) {
    return (
        <div>
            <h4 className="teal-text text-darken-5">Question</h4>
            <p>{question}</p>
        </div>
    );
};

export default QuestionContainer;