import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

const sendEvents = (events = []) => {
  const stringifiedEvents = JSON.stringify(events);
  // const endpoint = 'https://analytics.msclvr.co/events';
  const endpoint = `https://webhook.site/8fdf1c88-418b-4734-aca3-adcc672b88a4`;

  if (window.MSCLVR.debug) {
    console.log(stringifiedEvents);
  }

  try {
    if ('sendBeacon' in navigator) {
      navigator.sendBeacon(
        endpoint,
        new Blob([stringifiedEvents], { type: 'text/plain; charset=UTF-8' })
      );
    } else {
      axios({
        adapter: jsonpAdapter,
        url: endpoint,
        params: stringifiedEvents
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.toString());
  }

  return true;
};

export default sendEvents;
