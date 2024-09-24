import axios from "axios";

export const userCommentsApi = axios.create({
  baseURL: "https://dummyjson.com/",
});
