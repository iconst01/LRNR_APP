import AvatarPic from "./AvatarPic"
import BadgeIcon from "./BadgeIcon"

import { useContext } from "react"
import { UserContext } from "../context/UserProvider";

export default function UserInfoCard() {
    const { user } = useContext(UserContext);
    
    return (
        <>   
        <hr style={{margin: '0'}}/>
        <div className="userInfoCardWrapper">
            <div className="userInfoCard">
                <div>
                    <AvatarPic/>
                    <div>
                        <div className="usernameWrapper">
                        <p>{user.username}</p>
                        <div>
                            <a href="#">Pick a username </a>
                            <a href="#"> Add your bio</a>
                    </div>        
                        </div>
                    </div>
                </div>

                <div className="statsWrapper">
                    <button>Edit Profile</button> 

                    <div className="xpInfoWrapper">
                        <div className="xp">{user.lifetimeXP }</div>
                        <div className="badgesList"> 
                           0 <BadgeIcon/>  
                            0<BadgeIcon/> 
                             3<BadgeIcon/>
                             5<BadgeIcon/> 
                        </div>
                    </div>             
                </div>
            </div>
        </div>
        </>
    )
}
