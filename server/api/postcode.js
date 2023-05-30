const fetch = require("node-fetch")
const { apiGet, apiPost } = require( './api')

const apiRoot = "https://api.postcodes.io";

const postcode = (postcode, params = null) => {
  const pc = encodeURI(postcode);
  const result = apiGet( apiRoot, '/postcodes/' + pc, params)
  return result;
}

const postcodes = (postcodes, params = null) => {
  const body = { postcodes, ...params}
  const result = apiPost( apiRoot, '/postcodes', body)
  return result;
}

module.exports = {
  postcode,
  postcodes
}



