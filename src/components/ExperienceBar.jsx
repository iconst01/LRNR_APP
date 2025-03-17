import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

export default function ExperienceBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="progressBarContainer">
      <div className="progressBar">
        <div
          className="progressBarFill"
          style={{ width: `${user?.xp}%` }}
        ></div>
      </div>

      <span>{user?.xp}%</span>
    </div>
  );
}
