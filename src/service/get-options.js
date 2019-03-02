import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

const getOptions = async (pid, container) => {
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

export default getOptions;
