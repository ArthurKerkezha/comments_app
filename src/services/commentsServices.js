import { commentsApi } from "../api";
import { COMMENTS } from "../constants";

class UserCommentsServices {
  async getComments() {
    const response = await commentsApi.get(COMMENTS);
  }

  async removeComment(id) {
    const response = await commentsApi.delete(COMMENTS);
  }

  async addComment(comment) {
    const response = await commentsApi.post(COMMENTS, comment);
  }
}
