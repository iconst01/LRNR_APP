import MainDashboardSection from "./MainDashboardSection"
import { useState } from "react"

export default function AccountDashboard() {
      const [dashboardState, setDashboardState] = useState({
        badges: true, //will be on the badges section by default
        quizzes: false,
        questions: false,
        answers: false
    });

    function handleDashboardClick(e) {
        const section = e.target.innerText.toLowerCase(); //grabs the text from the <p> tags

        setDashboardState({
            //will be true or false if the user clicked on the certain text
            badges: section.includes("badges"),  
            quizzes: section.includes("quizzes"),
            questions: section.includes("questions"),
            answers: section.includes("answers")
        });
    }

    return (
        <div className="dashboardContainer" style={{ height: "100%", width: "100%" }}>
            <div className="row" id="dashboardRow">
                <div className="col s4 row">
                    <div className="col s7"></div>
                    <div className="col s5">
                        <div className="sidebarWrapper">
                            <h8>MY STUFF</h8>
                            <p onClick={handleDashboardClick}>Badges</p>
                            <h7>PLATINUM QUIZZES</h7>
                            <p className="yourQuizzesText" onClick={handleDashboardClick}>Your Quizzes</p>
                         </div>
                    </div>
                </div>
                <div className="seperator2"></div>
                <div className="col s8" >
                    {/* passing all the booleans to the MainDashboardSection component */}
                    <MainDashboardSection {...dashboardState}/>
                </div>
            </div>
        </div>
    )
};