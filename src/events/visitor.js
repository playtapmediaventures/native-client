class Visitor {
  constructor(_window) {
    const { document } = _window;
    this.document = document;
  }

  static COOKIE_NAME = '_msclvr_native';

  static COOKIE_EXPIRY_DAYS = 365;

  static generateId() {
    const version = 1;
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const firstTouch = new Date().getTime();

    return `${version}.${id}.${firstTouch}`;
  }

  setCookie(value, name = Visitor.COOKIE_NAME, expiryDays = Visitor.COOKIE_EXPIRY_DAYS) {
    const d = new Date();
    d.setTime(d.getTime() + expiryDays * 1000 * 60 * 60 * 24);
    const expires = `expires=${d.toGMTString()}`;
    this.document.cookie = `${name}=${value}; ${expires}`;
    console.log(this.document.cookie);
  }

  getCookie(name = Visitor.COOKIE_NAME) {
    const cookies = decodeURIComponent(this.document.cookie).split(';');
    const cookie = cookies.find(c => c.includes(name)) || '';

    return cookie.replace(`${name}=`, '');
  }

  checkCookie() {
    const visitorId = this.getCookie();
    if (visitorId === '') {
      const newVisitorId = Visitor.generateId();
      this.setCookie(newVisitorId);
      return false;
    }
    return true;
  }

  get id() {
    this.checkCookie();
    return this.getCookie();
  }
}

export default Visitor;
