import sendEvents from '../service/analytics';
import { buildEventMetadata } from '../events';

// eslint-disable-next-line no-multi-assign
const DATA_LAYER = (window.MSCLVRDataLayer = window.MSCLVRDataLayer || []);
const DEFAULT_INTERVAL = 1000;

const initialize = (pid, interval = DEFAULT_INTERVAL) => {
  setInterval(processEvents(pid), interval);
};

const processEvents = pid => (events = DATA_LAYER) => {
  const eventsToSend = events.splice(0, events.length);
  if (eventsToSend.length) {
    const eventMetadata = buildEventMetadata(pid, window);
    const enhancedEvents = {
      ...eventMetadata,
      events: eventsToSend
    };
    sendEvents(enhancedEvents);
  }
};

const publishEvent = event => {
  if (Object.keys(event).length > 0) {
    DATA_LAYER.push(event);
  }
};

export { initialize, publishEvent, processEvents };
