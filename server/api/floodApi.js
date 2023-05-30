const fetch = require("node-fetch");
const { apiGet } = require( './api')

const apiRoot = "http://environment.data.gov.uk/flood-monitoring";

const floodAreas = (params = null) => {
  const result = apiGet( apiRoot, '/id/floodAreas', params)
  return result;
}

const floods = (params  = null) => {
  const result = apiGet( apiRoot, '/id/floods', params)
  return result;
}

const stations = (params  = null) => {
  const result = apiGet( apiRoot, '/id/stations', params)
  return result;
}

const measures = (params  = null) => {
  const result = apiGet( apiRoot, '/id/measures', params)
  return result;
}

const readings = (params  = null) => {
  const result = apiGet( apiRoot, '/data/readings', params)
  return result;
}

const measuresFromStation = (stationId, params  = null) => {
  const result = apiGet( apiRoot, '/id/stations/' + stationId + '/id/measures', params)
  return result;
}

const readingsFromStation = (stationId, params  = null) => {
  const result = apiGet( apiRoot, '/id/stations/' + stationId + '/id/readings', params)
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
