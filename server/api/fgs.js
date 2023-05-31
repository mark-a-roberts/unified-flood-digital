const { apiGet } = require( './api')

const apiRoot = "https://api.ffc-environment-agency.fgs.metoffice.gov.uk/api/public/v1";
const counties = (params = null) => {
  return apiGet( apiRoot,'/counties', params)
}

const statements = ( params = null) => {
  return apiGet( apiRoot,'/statements', params)
}

/**
 * latest statement or with specific id
 * @param extra
 * @param params
 */
const statement = (extra, params = null) => {
  return  apiGet( apiRoot,'/statements/'+extra, params);
}


module.exports = {
  counties,
  statements,
  statement
}



