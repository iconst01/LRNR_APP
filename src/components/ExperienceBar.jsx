
export default function ExperienceBar({ xp=5 }) {
    return (
        <div className="progressBarContainer">
            <div className="progressBar">
            <div className="progressBarFill" style={{ width: `${xp}%` }}></div>
        </div>

        <span>{xp}%</span>
        </div>
        
    )
}