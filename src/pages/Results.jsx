// import { useNavigate } from "react-router-dom";
// import { motion } from 'framer-motion';
// import "../styles/Results.css";
// import "materialize-css/dist/css/materialize.min.css";
// import "materialize-css/dist/js/materialize.min.js";

// const ResultsPage = () => {
//     const navigate = useNavigate();

//     return (
//         <motion.div
//         initial={{ opacity: 0, y: 100 }} // Starts with opacity 0 and moves slightly up
//         animate={{ opacity: 1, y: 0 }} // Fades in and moves to normal position
//         exit={{ opacity: 0, y: 20 }} // Fades out and moves slightly down when exiting
//         transition={{ duration: 0.6 }} 
//         >
//             <div className="section container center-align">
//                 <h1 className="center-align teal-text text-darken-5">lrnr</h1>
//                 <h5>Questions Right: 0111</h5>
//                 <div className="section">
//                     <button className="btnTry waves-effect waves-light teal darken-1 btn-large" onClick={() => navigate("/quiz-gen")}>
//                         TRY ANOTHER QUIZ
//                 </button>
//                 </div>
//             </div>
//         </motion.div>  
//     );
// };

// export default ResultsPage;