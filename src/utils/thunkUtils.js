import { get } from "lodash";

export const generateErrorMessage = (error) =>
  get(error, "response.data.message", error.message);
