import levelBadge from '../assets/level-badge.png';

export default function BadgeIcon() { 
    return ( 
        <div className="badgeIcon">
            <img width="25px" height="25px" src={levelBadge} alt="badge"/>
        </div>        
    );
}
