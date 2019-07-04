class L10n {
  constructor() {
    this.date = new Date();
    let intlDateTimeFormat;
    try {
      intlDateTimeFormat = Intl.DateTimeFormat().resolvedOptions();
    } catch (e) {
      intlDateTimeFormat = {
        locale: '',
        timeZone: ''
      };
    }
    this.intlDateTimeFormat = intlDateTimeFormat;
  }

  get locale() {
    return this.intlDateTimeFormat.locale;
  }

  get timeZoneOffset() {
    return `${this.date.getTimezoneOffset() / -60.0}`;
  }

  get timeZone() {
    return this.intlDateTimeFormat.timeZone;
  }
}

export default L10n;
