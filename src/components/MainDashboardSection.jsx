import UserBadgeList from "./UserBadgeList";
import BasicCard from "./BasicCard";
import { achievementInfo, getAchievementConditions } from "../utils/badgeSystem";

import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function MainDashboardSection({ badges = true, quizzes, questions, answers }) {
    const { user } = useContext(UserContext);
    const achievementConditions = getAchievementConditions(user); 

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
                <h5>User Quizzes</h5>
            ): null}
        </div>
    );
}
