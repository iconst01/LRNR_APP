// Import necessary hooks and components from React and other libraries
import { useLocation, useNavigate } from "react-router-dom"; 
import { motion } from 'framer-motion';
import "../styles/Results.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Define the ResultsPage component
const ResultsPage = () => {
    // useLocation hook to access the state passed from the previous component
    const location = useLocation();
    // useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate(); 
    // Destructure state to get userAnswers, correctCount, and totalQuestions
    const { userAnswers, correctCount, totalQuestions } = location.state || {};

    return (
        // Use motion.div to add animations to the component
        <motion.div
            initial={{ opacity: 0, y: 100 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Animation when component mounts
            exit={{ opacity: 0, y: 20 }} // Animation when component unmounts
            transition={{ duration: 0.6 }} // Duration of the animation
        >
            {/* Main container for the results page */}
            <div className="section container center-align">
                {/* Heading for the page */}
                <h1 className="center-align teal-text text-darken-5">lrnr</h1>
                {/* Display the number of correct answers out of total questions */}
                <h5>Questions Right: {correctCount} / {totalQuestions}</h5>
                
                {/* Section for the "Try Another Quiz" button */}
                <div className="section">
                    <button
                        className="btnTry waves-effect waves-light teal darken-1 btn-large"
                        onClick={() => navigate("/quiz-gen")} // Navigate to the quiz generation page
                    >
                        TRY ANOTHER QUIZ
                    </button>
                </div>

                {/* Section for displaying detailed results */}
                <div className="section container">
                    <h6>Detailed Results:</h6>
                    <ul>
                        {/* Map through userAnswers to display each question's details */}
                        {userAnswers.map((result, index) => ( 
                            <li key={index}>
                                <div className="card section " style={{  marginBottom: '15px', textAlign: "left", padding: "20px"}}>
                                <strong className="cardTitle">Question {index + 1}:</strong> {result.question}<br />
                                <strong className="cardTitle">Your Answer:</strong> {result.userAnswer}<br />
                                <strong className="cardTitle">Correct Answer:</strong> {result.correctAnswer}<br />
                                <strong className="cardTitle">Result:</strong> {result.isCorrect ? "Correct" : "Incorrect"}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

// Export the ResultsPage component as the default export
export default ResultsPage;