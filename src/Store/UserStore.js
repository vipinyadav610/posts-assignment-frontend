import { observable, action, values } from "mobx";
import FetchBase from "../Api/FetchBase";
import { setItem, getItem, removeItem } from "Utils/Storage";
import { messageNotification } from "Utils/notification";

class UserStore extends FetchBase {
  @observable loading = false;

  @action.bound
  async login(value, history) {
    try {
      this.loading = true;
      const response = await this.post("/login", value);
      setItem("session-token", response.token);
      history.push("/");
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }

  @action.bound
  async register(value, history) {
    try {
      this.loading = true;
      delete value.confirm;
      debugger;
      const response = await this.post("/signup", value);
      debugger;
      setItem("session-token", response.token);
      history.push("/");
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }
}

export default UserStore;
