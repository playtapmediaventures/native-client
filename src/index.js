import React from 'react';
import ReactDOM from 'react-dom';

import getPublisherId from './util/get-publisher-id';
import getOptions from './service/get-options';
import { Links } from './links';

const initialize = async (
  pid = getPublisherId(),
  container = document.getElementById('msclvr')
) => {
  const options = await getOptions(pid, container);

  ReactDOM.render(<Links pid={pid} options={options} />, container);
};

const initializeTestEnvironments = () => {
  // eslint-disable-next-line no-restricted-globals
  if (location.host.match(/(localhost|msclvr\.co)/)) {
    const MSCLVR = {
      initialize
    };
    window.MSCLVR = MSCLVR;
  }
};

initialize();
initializeTestEnvironments();
