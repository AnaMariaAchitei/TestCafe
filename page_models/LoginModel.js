import { Selector, t } from "testcafe";

class LoginModel {
  constructor() {
    this.email = Selector("#email");
    this.password = Selector("#password");
    this.submitLoginBtn = Selector('button[test-data="submitBtn"]');
    this.loginResultMessage = Selector("#message");
  }

  async login(email, psw) {
    await t.typeText(this.email, email, { paste: true, replace: true });
    await t.typeText(this.password, psw, { paste: true, replace: true });
    await t.click(this.submitLoginBtn);
  }
}
export default new LoginModel();