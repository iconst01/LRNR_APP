import levelBadge from '../assets/level-badge.png';

export const users = [];

/* Features for the user
1. Streak - make a method that checks if the user pass the quiz and if it does add one point to the streak
2. 

*/

export class User {
  constructor(name, lastName, username, password) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.level = 0;
    this.xp = 0;
    this.jsXp = 0;
    this.golangXp = 0;
    this.awsXp = 0;
    this.otherXp = 0;
    this.lifetimeXP = 0;
    this.streak = 0;
    this.badges = [];
  }
}
