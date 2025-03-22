import React from "react";
function QuestionNumber({ current, total }) {
    return (
        <h3 className="center-align"
        style={{color: "#22C2C6"}}>
            {current + 1} of {total}
        </h3>
    );
};

export default QuestionNumber;