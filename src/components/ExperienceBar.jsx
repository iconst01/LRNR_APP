export default function ExperienceBar({ xp=10 }) {
    return (
        <div className="progressBar">
            <div className="progressBarFill" style={{ width: `${xp}%` }}></div>
        </div>
    )
}