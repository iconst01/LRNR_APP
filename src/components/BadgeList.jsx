import BadgeIcon from './BadgeIcon';

export default function BadgeList({ userBadges }) {
    const badgeText = [
        "JS Sprout",
        "JS Coder",
        "JS Architect",
        "JS Master",
        "JS Guru",

    ];

    return (
        <div style={{width: "80%"}}>
            <h5>Badges</h5>
            <div className="badgeListWrapper" style={{position: "relative"}}>
                {badgeText.map((badge, index) => (       
                        <div key={index} className='badgeIconWrapper'>
                            <BadgeIcon iconName="rankingBadge" width={150} height={150} />
                            <p>{badge}</p>
                        </div>
                ))}
            </div>
            <hr style={{backgroundColor: "#DBDCDD", width: "100%", marginLeft: "0rem"}}/>
        </div>

    );
}
