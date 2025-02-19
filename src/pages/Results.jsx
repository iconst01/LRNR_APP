import { useNavigate } from "react-router-dom";
import "../styles/Results.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

const ResultsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="section container center-align">
        <h1 className="center-align teal-text text-darken-5">lrnr</h1>
        <h5>Questions Right: 0111</h5>
        <div className="section">
        <button className="btnTry waves-effect waves-light teal darken-1 btn-large" onClick={() => navigate("/quiz-gen")}>
            TRY ANOTHER QUIZ
        </button>
        </div>
        </div>
    );
};

export default ResultsPage;