const { apiGet } = require('./api')

const apiRoot = "http://environment.data.gov.uk/flood-monitoring";

/**
 * flood monitoring areas
 * @param params
 * @returns {Promise<*>}
 */
const floodAreas = (params = null) => {
  return apiGet(apiRoot, '/id/floodAreas', params)
}

/**
 * flood warnings
 * @param params
 * @returns {Promise<*>}
 */
const floods = (params = null) => {
  return apiGet(apiRoot, '/id/floods', params)
}

const stations = (params = null) => {
  return apiGet(apiRoot, '/id/stations', params)
}

const measures = (params = null) => {
  return apiGet(apiRoot, '/id/measures', params)
}

const readings = (params = null) => {
  return apiGet(apiRoot, '/data/readings', params)
}

const measuresFromStation = (stationId, params = null) => {
  return apiGet(apiRoot, '/id/stations/' + stationId + '/id/measures', params)
}

const readingsFromStation = (stationId, params = null) => {
  return apiGet(apiRoot, '/id/stations/' + stationId + '/id/readings', params)
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
