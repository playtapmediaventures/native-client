import Page from './page';
import Device from './device';
import L10n from './l10n';

const buildEventMetadata = (publisherId = 'NOT_PROVIDED', _window = window) => {
  const { url, title, encoding, referrer } = new Page(_window);
  const { colorDepth, viewport, resolution, javaEnabled, cookieEnabled } = new Device(_window);
  const { locale, timeZone, timeZoneOffset } = new L10n();

  const event = {
    publisherId,
    page: { url, title, encoding, referrer },
    device: { colorDepth, viewport, resolution, javaEnabled, cookieEnabled },
    l10n: { locale, timeZone, timeZoneOffset }
  };

  return event;
};

const createEvent = (action, eventData = {}) => ({
  action,
  ...eventData,
  timestamp: new Date().getTime()
});

export { Page, Device, L10n, buildEventMetadata, createEvent };
