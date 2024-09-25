import { StorageEnum } from "../enums";

class Storage {
  static setScrollPosition(position) {
    return localStorage.setItem(
      StorageEnum.ScrollPositions,
      JSON.stringify(position),
    );
  }

  static getScrollPosition() {
    return JSON.parse(localStorage.getItem(StorageEnum.ScrollPositions));
  }

  static setCommentsParamsState(state) {
    return localStorage.setItem(
      StorageEnum.CommentsParams,
      JSON.stringify(state),
    );
  }

  static getCommentsParamsState() {
    return JSON.parse(localStorage.getItem(StorageEnum.CommentsParams));
  }

  static clearCommentsParamsState() {
    return localStorage.removeItem(StorageEnum.CommentsParams);
  }
}

export default Storage;
