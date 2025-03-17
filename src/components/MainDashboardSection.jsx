import UserBadgeList from "./UserBadgeList";
import BasicCard from "./BasicCard";
import { achievementInfo, getAchievementConditions } from "../utils/badgeSystem";

import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function MainDashboardSection({ badges = true, quizzes, questions, answers }) {
    const { user } = useContext(UserContext);
    const achievementConditions = getAchievementConditions(user); 

    const dateOptions = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", dateOptions);
  

    return (
        <div className="mainDashboardWrapper">
            {badges ? (
                <div>
                    <UserBadgeList />
                    <div>
                        <p className="badgesListTitle">Mastery Achievements</p>
                        <p>These are a collection of all the achievements you have received.</p>
                        <div className="basicCardWrapper">
                            {achievementInfo.map((eachAchievement, index) => (
                                achievementConditions[eachAchievement.title] && ( //will return the the values from the achievementConditions keys
                                    <BasicCard
                                        icon
                                        key={index}
                                        color="#e0e0e0"
                                        width={275}
                                        height={125}
                                        className="basicCard"
                                        title={eachAchievement.title}
                                        text={eachAchievement.text}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            ) : quizzes ? (
                <>
                    <h5>Your Quizzes</h5>
                    <div className="yourQuizContainer">
                        <div className="yourQuizBarWrapper">
                            <p>ACTIVITY</p>
                            <div><p>DATE</p>
                            <p>LEVEL</p></div>
                            
                            <p>CORRECT/TOTAL PROBLEMS</p>
                        </div>
                        <div>
                            <div className="yourQuizInfoWrapper">
                                <div className="yourQuizWordsWrapper">
                                    <div className="yourQuizWords">
                                        <p>What is Math?</p>
                                        <p>Breakthrough Junior Challenge</p>
                                    </div>
                                
                                    <div className="yourQuizOddInfo">
                                    <div>{formattedDate}</div>
                                    <div>Beginner</div>
                                    </div>
                                
                                    <div className="correctTotal"><p>6/7</p></div>
                                </div>
                               
                                <div className="seperator3"></div>
                            </div>
                            <div></div>
                        </div>    
                    </div>

                </>

            ): null}
        </div>
    );
}
