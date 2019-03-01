class Time {
  constructor() {
    this.date = new Date();
  }

  get timeZoneOffset() {
    return `${this.date.getTimeZoneOffset() / -60.0}`;
  }

  get value() {
    return this.date.getTime();
  }
}

export default Time;
