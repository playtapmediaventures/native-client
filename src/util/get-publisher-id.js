const getParams = (scriptName = 'msclvr-native.min.js') => {
  const script = [...document.getElementsByTagName('script')].find(({ src }) =>
    src.includes(scriptName)
  );

  if (script) {
    const { src } = script;
    // eslint-disable-next-line no-unused-vars
    const [_, queryString = ''] = src.split('?');
    const paramPairs = queryString.split('&');

    const params = paramPairs.reduce((agg, pair) => {
      const [key, value] = pair.split('=');
      // eslint-disable-next-line no-param-reassign
      agg[key] = decodeURIComponent(value);
      return agg;
    }, {});

    return params;
  }

  return {};
};

const getPublisherId = () => {
  const { id = window.MSCLVR.testPid } = getParams();
  return id;
};

export default getPublisherId;
