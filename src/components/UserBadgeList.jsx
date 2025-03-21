import BadgeIcon from "./BadgeIcon";

import { UserContext } from "../context/UserProvider";
import { useContext } from "react";

export default function UserBadgeList() {
  const { user } = useContext(UserContext);

  return (
    <div style={{ width: "80%" }}>
      <h5>Badges</h5>
      <div className="badgeListWrapper" style={{ position: "relative" }}>
        {user?.badges?.map((badge, index) => (
          <div key={index} className="badgeIconWrapper">
            {/* this will dynamically display the logged in user's badges */}
            <BadgeIcon userBadge={badge.badge} width={150} height={150} />

            <p>{badge.title}</p>
          </div>
        ))}
      </div>
      <hr
        style={{
          backgroundColor: "#DBDCDD",
          width: "100%",
          marginLeft: "0rem",
        }}
      />
    </div>
  );
}
