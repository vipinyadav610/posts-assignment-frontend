import UserStore from "./UserStore";
import PostsStore from "./PostsStore";

export default class CombinedStore {
  constructor() {
    this.user = new UserStore(this);
    this.posts = new PostsStore(this);
  }
}
