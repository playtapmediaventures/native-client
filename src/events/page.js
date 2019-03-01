class Page {
  constructor(_window) {
    this.window = _window;
  }

  get url() {
    return this.window.location.href;
  }

  get title() {
    return this.window.document.title;
  }

  get encoding() {
    return this.window.document.encoding;
  }
}

export default Page;
