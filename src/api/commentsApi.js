import { axiosCancellationInterceptor } from "./utils";

export const commentsApi = axiosCancellationInterceptor({
  baseURL: "https://dummyjson.com/",
  headers: { "Content-Type": "application/json" },
});
