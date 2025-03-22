
const EvaluationSection = ({correctAnswer, evaluation, handleNext, isLastQuestion }) => {
    return (
        <div className="section evalContainer">
            <h5 style={{color: "#22C2C6"}}>Verner's Evaluation</h5>

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
            <button className="waves-effect waves-light btn-large nextBtn" style={{backgroundColor: "#22C2C6"}} onClick={handleNext}>
                {isLastQuestion ? "FINISH" : "NEXT"}

            </button>
        </div>
    );
};

export default EvaluationSection;
