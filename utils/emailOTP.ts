export class EmailOTP {
  static emailKey = "user-email-otp";

  static getLocalEmail() {
    return localStorage.getItem(EmailOTP.emailKey);
  }

  static setLocalEmail(email: string) {
    localStorage.setItem(EmailOTP.emailKey, email);
  }

  static removeLocalEmail() {
    return localStorage.removeItem(EmailOTP.emailKey);
  }
}
