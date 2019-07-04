import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

const getOptions = async (pid, container) => {
  // const endpoint = 'https://msclvr.co/native/links';
  const endpoint = 'http://localhost:4000/links';
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
    const response = axios({
      adapter: jsonpAdapter,
      url: endpoint,
      params: queryParams,
      timeout: 1000
    });

    ({ data: options } = response);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(url, queryParams, e.toString());
  }
  options = [0, 1, 2, 3, 4, 5].map(i => ({
    href: 'https://www.google.com',
    offer_id: `offer${i}`,
    img:
      'https://media.ticketmaster.com/en-us/dam/a/375/9762c506-c0d5-479c-a022-6a1473c6b375_1008721_EVENT_DETAIL_PAGE_16_9.jpg',
    head: "DMX - 20 Year Anniversary Tour - It's Dark and Hell is Hot",
    loc: 'Madison Square Garden',
    sub: `$99.9${i}`
  }));
  return options;
};

export default getOptions;
