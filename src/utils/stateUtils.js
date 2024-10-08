import Storage from "../helpers/storage";

export const saveState = (state) => {
  try {
    Storage.setApplicationState(state);
  } catch (err) {
    console.log(err);
  }
};
