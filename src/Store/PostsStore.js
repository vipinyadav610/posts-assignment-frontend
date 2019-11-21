import { observable, action, values } from "mobx";
import FetchBase from "../Api/FetchBase";
import { messageNotification } from "Utils/notification";

class PostsStore extends FetchBase {
  @observable loading = false;
  @observable posts = [];

  @action.bound
  async getPosts() {
    try {
      this.loading = true;
      const response = await this.get("/posts");
      this.posts = response.data.posts;
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }
  @action.bound
  async onVote(post_id) {
    try {
      const res = await this.post("/posts/votes", { post_id });
      messageNotification("success", res.message);
      this.getPosts();
    } catch (error) {
      console.log("error", error);
      messageNotification("error", "Error occured while voting");
    }
  }
  @action.bound
  async addPost(values) {
    try {
      const res = await this.post("/posts", values);
      messageNotification("success", res.message);
      this.getPosts();
      return res;
    } catch (error) {
      console.log("error", error);
      messageNotification("error", "Error adding post");
    }
  }
}

export default PostsStore;
