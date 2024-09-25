class Storage {
  static setScrollPosition(position) {
    return localStorage.setItem("scroll_position", JSON.stringify(position));
  }

  static getScrollPosition() {
    return JSON.parse(localStorage.getItem("scroll_position"));
  }
}

export default Storage;
