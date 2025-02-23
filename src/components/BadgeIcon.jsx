import levelBadge from '../assets/level-badge.png';

export default function BadgeIcon({ height=25, width=25 }) { 
    return ( 
        <div className="badgeIcon">
            <img width={`${width}px`} height={`${height}px`} src={levelBadge} alt="badge"/>
        </div>        
    );
}
