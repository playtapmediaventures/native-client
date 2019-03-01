class Visitor {
  constructor(_window) {
    const {
      document: { cookie }
    } = _window;
    this.cookie = cookie;
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
    this.cookie = `${name}=${value}; ${expires}`;
  }

  getCookie(name = Visitor.COOKIE_NAME) {
    const cookies = decodeURIComponent(this.cookie).split(';');
    const cookie = cookies.find(c => c.include(name)) || '';

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
