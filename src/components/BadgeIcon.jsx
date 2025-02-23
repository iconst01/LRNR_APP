import award from '../assets/award.png';
import bronzeBadge from '../assets/bronze-badge.png';
import diamond from '../assets/diamond.png';
import goldMedal from '../assets/gold-medal.png';
import levelBadge from '../assets/level-badge.png';
import premiumQuality from '../assets/premium-quality.png';
import rankingBadge from '../assets/ranking-badge.png';
import silverMedal from '../assets/silver-medal.png';

const icons = {
    award,
    bronzeBadge,
    diamond,
    goldMedal,
    levelBadge,
    premiumQuality,
    rankingBadge,
    silverMedal
};

export default function BadgeIcon({ iconName, height = 25, width = 25 }) {
    const iconSrc = icons[iconName] || levelBadge; //to dynamically get a key, need to use bracket notation

    return (
        <div className="badgeIcon">
            <img width={width} height={height} src={iconSrc} alt={iconName || 'badge'} />
        </div>
    );
}
