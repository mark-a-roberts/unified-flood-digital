const fetch = require("node-fetch");

const paramsToString = (params) => {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

const apiGet = async ( root, path, params) => {
  const url = root + path + (params ? '?' + paramsToString(params) : '');
  const response = await fetch(url);
  const data = await response.json();
  return data;

}

const apiPost = async (root, path, body) => {
  const response = await fetch(root + path, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  return data;
}

module.exports = {
  paramsToString,
  apiGet,
  apiPost
}
