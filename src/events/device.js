class Device {
  constructor(_window) {
    this.window = _window;
  }

  get javaEnabled() {
    return this.window.navigator.javaEnabled;
  }

  get cookieEnabled() {
    return this.window.navigator.cookieEnabled;
  }

  get colorDepth() {
    return this.window.screen.colorDepth;
  }

  get resolution() {
    const {
      screen: { availWidth, availHeight }
    } = this.window;
    return `${availWidth}x${availHeight}`;
  }

  get viewport() {
    const {
      document: {
        documentElement: { clientWidth, clientHeight }
      }
    } = this.window;
    return `${clientWidth}x${clientHeight}`;
  }
}

export default Device;
