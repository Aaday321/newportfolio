
import  {v4 as uuidv4} from 'uuid'

export class AuthToken {
  constructor(user) {
    this.token = uuidv4()
    this.user = user;
    this.created = Date.now();
    this.experation = this.created + this.minutesToMiliSeconds(30);
  }

  activate() {
    if (Date.now() >= this.experation) {
      console.log(`
                ${ths.user.firstName}'s session has expired
            `);
      return false;
    }


    setTimeout(this.isNotExpired, 100);
    return true;
  }

  renew(extentionMinutes) {
    if (extentionMinutes) {
      this.experation = Date.now + this.minutesToMiliSeconds(extentionMinutes);
    } else this.experation = Date.now + this.minutesToMiliSeconds(30);
  }

  secondsToMiliSeconds(seconds) {
    return seconds * 1000;
  }
  minutesToMiliSeconds(minutes) {
    return this.secondsToMiliSeconds(minutes) * 60;
  }
  hoursToMiliSeconds(hours) {
    return this.minutesToMiliSeconds(hours) * 60;
  }
}