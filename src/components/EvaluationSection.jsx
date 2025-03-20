
const EvaluationSection = ({correctAnswer, evaluation, handleNext, isLastQuestion }) => {
    return (
        <div className="section evalContainer">
            <h5 className="teal-text text-darken-2">Verner's Evaluation</h5>

            <div className="evalContent">
                {/* Left Side - Correct/Incorrect */}
                <div className="evalLeft">

                    <h6>Correct Answer: {correctAnswer}</h6>
                 
                </div>
                {/* Right Side - Explanation */}
                <div className="evalRight">
                    <p>{evaluation}</p>
                </div>
            </div>

            {/* Bottom Section - Next Button */}
            <button className="waves-effect waves-light btn-large teal darken-1 nextBtn" onClick={handleNext}>
                {isLastQuestion ? "FINISH" : "NEXT"}

            </button>
        </div>
    );
};

export default EvaluationSection;
