import goldMedal from "../assets/gold-medal.png";
import levelBadge from "../assets/level-badge.png";
import premiumQuality from "../assets/premium-quality.png";
import silverMedal from "../assets/silver-medal.png";

const allBadgesText = {
  golang: [
    "Golang Sprout",
    "Golang Coder",
    "Golang Architect",
    "Golang Master",
    "Golang Guru",
  ],
  aws: ["AWS Sprout", "AWS Coder", "AWS Architect", "AWS Master", "AWS Guru"],
  javascript: [
    "JavaScript Sprout",
    "JavaScript Coder",
    "JavaScript Architect",
    "JavaScript Master",
    "JavaScript Guru",
  ],
  ci_cd: [
    "CI/CD Sprout",
    "CI/CD Coder",
    "CI/CD Architect",
    "CI/CD Master",
    "CI/CD Guru",
  ],
  home_gardens: [
    "Home Gardens Sprout",
    "Home Gardens Enthusiast",
    "Home Gardens Architect",
    "Home Gardens Master",
    "Home Gardens Guru",
  ],
  coffee: [
    "Coffee Sprout",
    "Coffee Enthusiast",
    "Coffee Brewer",
    "Coffee Connoisseur",
    "Coffee Guru",
  ],
  finger_food: [
    "Finger Food Sprout",
    "Finger Food Enthusiast",
    "Finger Food Chef",
    "Finger Food Master",
    "Finger Food Guru",
  ],
  custom: ["Sprout", "Coder", "Architect", "Master", "Guru"],
};

export const achievementInfo = [
  { title: "Platinum Pioneer", text: "Earned your first expert-level badge." },
  { title: "Trophy Hunter", text: "Collected 2 badges." },
  { title: "Combo Master", text: "Got 5 correct answers in a row." },
  { title: "Flawless Victory", text: "Got a perfect score on a quiz." },
  {
    title: "Legendary Streak",
    text: "Maintained a daily quiz streak for a week.",
  },
  { title: "New Challenger", text: "Took your first quiz." },
  { title: "Mastermind", text: "Has XP in three different categories." },
];

export function getAchievementConditions(currentUser) {
  return {
    "Platinum Pioneer": currentUser.badges?.length > 0,
    "Trophy Hunter": currentUser.badges?.length >= 2,
    "Combo Master": currentUser.streak >= 5,
    "New Challenger": currentUser.xp > 0,
    Mastermind:
      currentUser.golangXp +
        currentUser.awsXp +
        currentUser.javascriptXp +
        currentUser.ci_cdXp +
        currentUser.home_gardensXp +
        currentUser.coffeeXp +
        currentUser.finger_foodXp >=
      5,
  };
}

export const badges = {
  BEGINNER: levelBadge,
  INTERMEDIATE: silverMedal,
  ADVANCED: goldMedal,
  EXPERT: premiumQuality,
};

const XP_THRESHOLDS = {
  BEGINNER: 30,
  INTERMEDIATE: 100,
  ADVANCED: 140,
  EXPERT: 150,
};

function assignBadges(currentUser) {
  const highestBadges = {};

  for (const difficulty in XP_THRESHOLDS) {
    const threshold = XP_THRESHOLDS[difficulty];

    const categories = [
      "golang",
      "aws",
      "javascript",
      "ci_cd",
      "home_gardens",
      "coffee",
      "finger_food",
    ];

    categories.forEach((category) => {
      if (currentUser[`${category}Xp`] >= threshold) {
        highestBadges[category] = {
          badge: badges[difficulty],
          title:
            allBadgesText[category][
              Object.keys(XP_THRESHOLDS).indexOf(difficulty)
            ],
        };
      }
    });

    if (currentUser.customTopics?.length > 0) {
      currentUser.customTopics.forEach((topic) => {
        const topicXp = currentUser[`${topic}Xp`] || 0;
        if (topicXp >= threshold) {
          const customBadgeTitle =
            allBadgesText.custom[
              Object.keys(XP_THRESHOLDS).indexOf(difficulty)
            ];
          highestBadges[topic] = {
            badge: badges[difficulty],
            title: `${topic} ${customBadgeTitle}`,
          };
        }
      });
    }
  }

  currentUser.badges = Object.values(highestBadges);
}

export function updateCustomTopicsAndBadges(currentUser) {
  if (!currentUser.customTopics) {
    currentUser.customTopics = [];
  }

  if (
    currentUser.customTopic &&
    !currentUser.customTopics.includes(currentUser.customTopic)
  ) {
    currentUser.customTopics.push(currentUser.customTopic);
    const newProperty = `${currentUser.customTopic}Xp`;
    if (!(newProperty in currentUser)) {
      currentUser[newProperty] = 0;
    }
  }
}

export function updateXP(currentUser, xpGained, typeOfXp) {
  currentUser.xp += xpGained;
  currentUser.lifetimeXP += xpGained;

  const validTypes = [
    "golang",
    "aws",
    "javascript",
    "ci_cd",
    "home_gardens",
    "coffee",
    "finger_food",
  ];

  if (validTypes.includes(typeOfXp)) {
    currentUser[`${typeOfXp}Xp`] += xpGained;
  } else {
    if (!currentUser.customTopics.includes(typeOfXp)) {
      currentUser.customTopics.push(typeOfXp);
    }
    const xpKey = `${typeOfXp}Xp`;
    currentUser[xpKey] = (currentUser[xpKey] || 0) + xpGained;
  }

  assignBadges(currentUser);
  updateLevel(currentUser);
}

function updateLevel(currentUser) {
  if (currentUser.xp === 100) {
    currentUser.level += 1;
    currentUser.xp = 0;
  }
}

export function updateStreak(currentUser, isCorrect = true) {
  console.log(currentUser);
  if (!currentUser) {
    return;
  }

  if (isCorrect) {
    currentUser.streak += 1;
  } else {
    currentUser.streak = 0;
  }
}
