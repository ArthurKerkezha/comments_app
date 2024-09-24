import axios from "axios";

export const commentsApi = axios.create({
  baseURL: "https://dummyjson.com/",
});
