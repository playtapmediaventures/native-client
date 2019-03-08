class Time {
  constructor() {
    this.date = new Date();
  }

  get timeZoneOffset() {
    return `${this.date.getTimezoneOffset() / -60.0}`;
  }

  get timestamp() {
    return this.date.getTime();
  }
}

export default Time;
