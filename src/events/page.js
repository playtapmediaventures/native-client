class Page {
  constructor(_window, pid = 'NOT_PROVIDED') {
    this.window = _window;
    this.publisherId = `${pid}`;
  }

  get url() {
    return this.window.location.href;
  }

  get title() {
    return this.window.document.title;
  }

  get encoding() {
    return this.window.document.inputEncoding;
  }

  get referrer() {
    return this.window.document.referrer;
  }
}

export default Page;
