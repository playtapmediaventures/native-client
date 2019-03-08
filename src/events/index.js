import Page from './page';
import Device from './device';
import Visitor from './visitor';
import Time from './time';

const buildEvent = (_window = window, pid) => {
  const { id } = new Visitor(_window);
  const { publisherId, url, title, encoding, referrer } = new Page(_window, pid);
  const { colorDepth, viewport, resolution, javaEnabled, cookieEnabled } = new Device(_window);
  const { timestamp, timeZoneOffset } = new Time();

  const event = {
    visitor: { id },
    page: { publisherId, url, title, encoding, referrer },
    device: { colorDepth, viewport, resolution, javaEnabled, cookieEnabled },
    timestamp,
    timeZoneOffset
  };

  return event;
};

export { Page, Device, Visitor, Time, buildEvent };
