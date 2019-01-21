import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import React from 'react';
import ReactDOM from 'react-dom';

import getPublisherId from './util/get-publisher-id';
import { Links } from './links';

const getOptions = async () => {
  const endpoint = 'https://msclvr.co/native/links';
  const {
    dataset: { url = 'default', ip }
  } = container;
  const queryParams = {
    url,
    pid
  };
  if (ip) {
    queryParams.ip = ip;
  }

  let options = [];
  try {
    const response = await axios({
      adapter: jsonpAdapter,
      url: endpoint,
      params: queryParams
    });

    ({ data: options } = response);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(url, queryParams, e.toString());
  }
  return options;
};

const initialize = async () => {
  const options = await getOptions();

  const render = containerWidth => {
    ReactDOM.render(
      <Links pid={pid} containerWidth={containerWidth} options={options} />,
      container
    );
  };

  window.addEventListener('resize', () => {
    render(container.offsetWidth);
  });

  render(container.offsetWidth);
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

let pid = getPublisherId();
const container = document.getElementById('msclvr');
initialize();
initializeTestEnvironments();
