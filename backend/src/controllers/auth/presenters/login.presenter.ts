import type { PostContent } from "../../post/presenters/post-presenters";

export class LoginPresenter {
  status: boolean;
  token: string;

  constructor(status: boolean, token: string) {
    this.status = status;
    this.token = token;
  }
}
