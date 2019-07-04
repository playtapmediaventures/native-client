import React from 'react';
import ReactDOM from 'react-dom';

import getPublisherId from './util/get-publisher-id';
import { initialize as initAnalytics, publishEvent } from './util/analytics';
import { createEvent } from './events';
import getOptions from './service/get-options';
import { Links } from './links';

const initialize = async (
  pid = getPublisherId(),
  container = document.getElementById('msclvr'),
  initializeAnalytics = initAnalytics
) => {
  initializeAnalytics(pid);
  publishEvent(createEvent('session_start'));

  const options = await getOptions(pid, container);
  ReactDOM.render(<Links pid={pid} options={options} />, container);
};

const initializeTestEnvironments = () => {
  // eslint-disable-next-line no-restricted-globals
  if (location.host.match(/(localhost|msclvr\.co)/)) {
    const MSCLVR = {
      initialize,
      testPid: 1,
      debug: true
    };
    window.MSCLVR = MSCLVR;
  }
};

initializeTestEnvironments();
initialize();
