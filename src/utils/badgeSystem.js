import award from '../assets/award.png';
import bronzeBadge from '../assets/bronze-badge.png';
import diamond from '../assets/diamond.png';
import goldMedal from '../assets/gold-medal.png';
import levelBadge from '../assets/level-badge.png';
import premiumQuality from '../assets/premium-quality.png';
import rankingBadge from '../assets/ranking-badge.png';
import silverMedal from '../assets/silver-medal.png';


const allBadgesText = {
    "js": [
        "JS Sprout",
        "JS Coder",
        "JS Architect",
        "JS Master",
        "JS Guru",
    ],
    'golang': [
        "GO Sprout",
        "GO Coder",
        "GO Architect",
        "GO Master",
        "GO Guru",
    ],
    'aws' : [
        "AWS Sprout",
        "AWS Coder",
        "AWS Architect",
        "AWS Master",
        "AWS Guru",
    ]

}

 export const badges = {
    BEGINNER: levelBadge,
    INTERMEDIATE: silverMedal,
    ADVANCED: goldMedal,
    EXPERT: rankingBadge,
};

const XP_THRESHOLDS = {
    BEGINNER: 50,
    INTERMEDIATE: 100,
    ADVANCED: 140,
    EXPERT: 150,
};

function assignBadges(currentUser) {
    const highestBadges = {}; // object to store the highest badge per category

    for (const difficulty in XP_THRESHOLDS) {     
        const threshold = XP_THRESHOLDS[difficulty];

        if (currentUser.golangXp >= threshold) {
            highestBadges.golang = { 
                badge: badges[difficulty],  //will be an img path i.e., /src/assets/goldBadge.png
                title: allBadgesText.golang[Object.keys(XP_THRESHOLDS).indexOf(difficulty)]  //will end up as i.e. allBadgesText.golang[3]
            };
        }

        if (currentUser.jsXp >= threshold) {
            highestBadges.js = { 
                badge: badges[difficulty], 
                title: allBadgesText.js[Object.keys(XP_THRESHOLDS).indexOf(difficulty)] 
            };
        }

        if (currentUser.awsXp >= threshold) {
            highestBadges.aws = { 
                badge: badges[difficulty], 
                title: allBadgesText.aws[Object.keys(XP_THRESHOLDS).indexOf(difficulty)]
             };
        }

        if (currentUser.otherXp >= threshold) {
            highestBadges.other = { 
                badge: badges[difficulty], 
                title: "Other" 
            };
        }
        
    }

    // replace the user's badges with only the highest-ranked ones per topic
    currentUser.badges = Object.values(highestBadges);
}



function updateLevel(currentUser) {
    //once the user has gotten 100 xp
    if(currentUser.xp === 100) {
        currentUser.level += 1; //add one to their level
        currentUser.xp = 0; //reset their current xp
    }
}

export function updateXP(currentUser, xpGained, typeOfXp) {
    currentUser.xp += xpGained;
    currentUser.lifetimeXP += xpGained;

    //switch statemnet to add xp to a specific topic
    switch (typeOfXp) {
        case 'js':
            currentUser.jsXp += xpGained;
            break;
        case 'golang':
            currentUser.golangXp += xpGained;
            break;
        case 'aws':
            currentUser.awsXp += xpGained;
            break;
        default:
            currentUser.otherXp += xpGained
            break;
    }
    
    assignBadges(currentUser);
    updateLevel(currentUser);
}
