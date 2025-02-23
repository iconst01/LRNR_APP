import StreakIcon from "./StreakIcon"
import ExperienceBar from "./ExperienceBar"

export default function LevelCard({ level=10, xp, xpToNextLevel }) {
    return (
        <div className="levelCardWrapper">
            <div className="streakCardWrapper">
                <div className="streakCardInfo">
                    <StreakIcon />  
                        <p className="streakNumber">0</p>
                        <div className="weekStreakText">
                            <p>daily</p>
                            <p>streak</p>
                        </div>                
                </div>
            </div>

            <div className="seperator"></div>

            <div className="userLevelInfo"> 
                Level {level}
                <ExperienceBar/>
            </div>

         
        </div>
    )
};