const fetch = require("node-fetch")
const paramsToString = require( './api')

const apiRoot = "https://api.ffc-environment-agency.fgs.metoffice.gov.uk/api/public/v1";

const apiGet = async ( path, params) => {
  const url = apiRoot + path + params ? '' : '?' + paramsToString(params);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const apiPost = async (path, body) => {
  const response = await fetch(apiRoot + path, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  const data = await response.json();
  return data;
}

const counties = (params = null) => {
  const result = apiGet( '/counties', params)
  return result;
}

module.exports = {
  counties
}



