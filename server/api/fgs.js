const fetch = require("node-fetch")
const { apiGet } = require( './api')

const apiRoot = "https://api.ffc-environment-agency.fgs.metoffice.gov.uk/api/public/v1";

const counties = (params = null) => {
  const result = apiGet( apiRoot,'/counties', params)
  return result;
}

module.exports = {
  counties
}



