import { get } from "lodash";

export const generateErrorMessage = (error) =>
  get(error, "response.data.message", error.message);

export const calculateNextSkip = (currentSkip, limit, total) => {
  const nextSkip = currentSkip + limit;

  return nextSkip < total ? nextSkip : total;
};
