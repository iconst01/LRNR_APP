import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import QuizGen from "./pages/QuizGen";
import QuizPage from "./pages/QuizPage";
import Account from "./pages/Account";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/quiz-gen" element={<QuizGen />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/results" element={<Results />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


