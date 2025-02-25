import goldMedal from '../assets/gold-medal.png';
import levelBadge from '../assets/level-badge.png';
import premiumQuality from '../assets/premium-quality.png';
import silverMedal from '../assets/silver-medal.png';

const allBadgesText = {
    "history": [
        "History Sprout",
        "History Coder",
        "History Architect",
        "History Master",
        "History Guru",
    ],
    'science': [
        "Science Sprout",
        "Science Coder",
        "Science Architect",
        "Science Master",
        "Science Guru",
    ],
    'math' : [
        "Math Sprout",
        "Math Coder",
        "Math Architect",
        "Math Master",
        "Math Guru",
    ],
    'custom': [
        "Sprout",
        "Coder",
        "Architect",
        "Master",
        "Guru" 
    ]
}

export const achievementInfo = [
        { title: "Platinum Pioneer", text: "Earned your first expert-level badge." },
        { title: "Trophy Hunter", text: "Collected 2 badges." },
        { title: "Combo Master", text: "Got 5 correct answers in a row." },
        { title: "Flawless Victory", text: "Got a perfect score on a quiz." },
        { title: "Legendary Streak", text: "Maintained a daily quiz streak for a week." },
        { title: "New Challenger", text: "Took your first quiz." },
        { title: "Mastermind", text: "Has XP in three different categories." },
    ];

    export function getAchievementConditions(currentUser) {
        return {
            "Platinum Pioneer": currentUser.badges?.length > 0,  // Has at least one badge
            "Trophy Hunter": currentUser.badges?.length >= 2,   // Collected at least two badges
            "Combo Master": currentUser.streak >= 5,  // Answered 5 correct in a row
            "New Challenger": currentUser.xp > 0, // Gained any experience
            "Mastermind": currentUser.mathXp + currentUser.scienceXp + currentUser.historyXp >= 5, // Accumulated XP across categories
        };
    }
    

export const badges = {
    BEGINNER: levelBadge,
    INTERMEDIATE: silverMedal,
    ADVANCED: goldMedal,
    EXPERT: premiumQuality,
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

        // Science badge assignment
        if (currentUser.scienceXp >= threshold) {
            highestBadges.science = { 
                badge: badges[difficulty],         //will be an img path i.e., /src/assets/goldBadge.png
                title: allBadgesText.science[Object.keys(XP_THRESHOLDS).indexOf(difficulty)]   //will end up as i.e. allBadgesText.science[3]
            };
        }

        // History badge assignment        
        if (currentUser.historyXp >= threshold) {
            highestBadges.history = { 
                badge: badges[difficulty], 
                title: allBadgesText.history[Object.keys(XP_THRESHOLDS).indexOf(difficulty)] 
            };
        }

        // Math badge assignment
        if (currentUser.mathXp >= threshold) {
            highestBadges.math = { 
                badge: badges[difficulty], 
                title: allBadgesText.math[Object.keys(XP_THRESHOLDS).indexOf(difficulty)]
             };
        }

        if (currentUser.customXp >= threshold) {
            const customTopic = currentUser.customTopic;
        
            // Find the correct badge title based on the customTopic and the XP threshold
            const customBadgeTitle = allBadgesText.custom[Object.keys(XP_THRESHOLDS).indexOf(difficulty)];
        
            highestBadges.custom = { 
                badge: badges[difficulty], 
                title: `${customBadgeTitle} ${customTopic}` // Append the topic to the badge title
            };
        }
    }

    // replace the user's badges with only the highest-ranked ones per topic
    currentUser.badges = Object.values(highestBadges);
}

export function updateCustomTopicsAndBadges(currentUser) {
    if(currentUser.customTopic) {
        if(!currentUser.customTopics.includes(currentUser.customTopic))
            currentUser.customTopics.push(currentUser.customTopic);
            const newProperty = `${currentUser.customTopic.at(-1)}Xp`
            currentUser[newProperty] = 0;
    }
}

function updateLevel(currentUser) {
    // once the user has gotten 100 xp
    if(currentUser.xp === 100) {
        currentUser.level += 1; // add one to their level
        currentUser.xp = 0; // reset their current xp
    }
}

export function updateStreak(currentUser, isCorrect = true) {
    if(isCorrect) {
        currentUser.streak += 1;
    } else {
        currentUser.streak = 0;
    }
}

export function updateXP(currentUser, xpGained, typeOfXp) {
    currentUser.xp += xpGained;
    currentUser.lifetimeXP += xpGained;

    // switch statement to add xp to a specific topic
    switch (typeOfXp) {
        case 'Math':
            currentUser.mathXp += xpGained;
            break;
        case 'Science':
            currentUser.scienceXp += xpGained;
            break;
        case 'History':
            currentUser.historyXp += xpGained;
            break;
        default:
            currentUser.customXp += xpGained;
            break;
    }
    
    assignBadges(currentUser);
    updateLevel(currentUser);
}