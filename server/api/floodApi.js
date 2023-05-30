const fetch = require("node-fetch");
const paramsToString = require( './api')

const apiRoot = "http://environment.data.gov.uk/flood-monitoring";

const apiGet = async ( path, params = null) => {
  const url = apiRoot + path + (params ?  '?' + paramsToString(params) : '');
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

const floodAreas = (params = null) => {
  const result = apiGet( '/id/floodAreas', params)
  return result;
}

const floods = (params  = null) => {
  const result = apiGet( '/id/floods', params)
  return result;
}

const stations = (params  = null) => {
  const result = apiGet( '/id/stations', params)
  return result;
}

const measures = (params  = null) => {
  const result = apiGet( '/id/measures', params)
  return result;
}

const readings = (params  = null) => {
  const result = apiGet( '/data/readings', params)
  return result;
}

const measuresFromStation = (stationId, params  = null) => {
  const result = apiGet( '/id/stations/' + stationId + '/id/measures', params)
  return result;
}

const readingsFromStation = (stationId, params  = null) => {
  const result = apiGet( '/id/stations/' + stationId + '/id/readings', params)
  return result;
}

module.exports = {
  floodAreas,
  floods,
  stations,
  measures,
  readings,
  measuresFromStation,
  readingsFromStation
}



