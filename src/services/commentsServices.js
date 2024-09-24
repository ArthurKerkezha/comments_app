import { commentsApi } from "../api";
import { COMMENTS, COMMENTS_ADD } from "../constants";

class CommentsServices {
  async getComments(params) {
    return commentsApi.get(COMMENTS, { ...params });
  }

  async getComment(id) {
    return commentsApi.get(`${COMMENTS}/${id}`);
  }

  async addComment(body) {
    return commentsApi.post(COMMENTS_ADD, body);
  }

  async removeComment(id) {
    return commentsApi.delete(`${COMMENTS}/${id}`);
  }
}

export default new CommentsServices();
