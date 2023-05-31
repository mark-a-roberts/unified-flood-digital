const { apiGet, apiPost } = require( './api')

const apiRoot = "https://api.postcodes.io";

const postcode = (postcode, params = null) => {
  const pc = encodeURI(postcode);
  return apiGet( apiRoot, '/postcodes/' + pc, params)
}

const postcodes = (postcodes, params = null) => {
  const body = { postcodes, ...params}
  return  apiPost( apiRoot, '/postcodes', body)
}

module.exports = {
  postcode,
  postcodes
}



