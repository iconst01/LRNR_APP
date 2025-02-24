import { badges } from '../utils/badgeSystem';

export default function BadgeIcon({ userBadge, height = 25, width = 25 }) {
    //to dynamically get a key, need to use bracket notation
    const iconSrc = userBadge || badges.BEGINNER //by default user has a beginner badges
    return (
        <div className="badgeIcon">
            <img width={width} height={height} src={iconSrc} alt={badges[userBadge] || 'badge'} />
        </div>
    );
}
