import StreakIcon from "./StreakIcon"
import ExperienceBar from "./ExperienceBar"

import { useContext } from "react"
import { UserContext } from "../context/UserProvider";

export default function UserLevelCard() {
    const { user } = useContext(UserContext);

    return (
        <div className="levelCardWrapper">
            <div className="streakCardWrapper">
                <div className="streakCardInfo">
                    <StreakIcon />  
                        <p className="streakNumber">{user.streak}</p>
                        <div className="weekStreakText">
                            <p>correct</p>
                            <p>streak</p>
                        </div>                
                </div>
            </div>

            <div className="seperator"></div>

            <div className="userLevelInfo"> 
                Level {user.level}
                <ExperienceBar/>
            </div>

         
        </div>
    )
};