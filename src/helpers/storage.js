import { StorageEnum } from "../enums";

class Storage {
  static setApplicationState(state) {
    return localStorage.setItem(StorageEnum.AppState, JSON.stringify(state));
  }

  static getApplicationState() {
    return JSON.parse(localStorage.getItem(StorageEnum.AppState));
  }

  static setScrollPosition(position) {
    return localStorage.setItem(
      StorageEnum.ScrollPositions,
      JSON.stringify(position),
    );
  }

  static getScrollPosition() {
    return JSON.parse(localStorage.getItem(StorageEnum.ScrollPositions));
  }
}

export default Storage;
