const env = require('../api/floodApi.js');
const metOffice = require('../api/fgs.js');
const postcode = require('../api/postcode.js');

/**
 * Test environment API
 * @returns {Promise<void>}
 */

const envTest = async () => {
  let result;

  result = await env.floods();
  console.log('Floods')
  console.log(result);

  result = await env.floodAreas({ _limit: 10000 });

  console.log('FloodAreas');
  console.log(result.meta)
  console.log('Items: ' + result.items.length)
}

/**
 * Test Postcode API
 */

const postcodeTest = async () => {
  let result;

  result = await postcode.postcode('NN6 7YL');

  console.log('Postcode');
  console.log(result)

  result = await postcode.postcodes(['NN11 3HW', 'NN6 7YL']);

  console.log('Postcodes');
  console.log(result)
}

/**
 * Test Met Office API
 * @returns {Promise<void>}
 */
const metTest = async () => {
  let result;
  result = await metOffice.counties();
  console.log('Counties:' + result.counties.length)
  console.log(result.counties[0])

  result = await metOffice.statements();
  console.log('Statements: ' + result.statements.length);

  result = await metOffice.statement('latest');
  console.log('Latest Statements');
  console.log(result);

  result = await metOffice.statement('latest_public_forecast');
  console.log('Latest Forecast');
  console.log(result);
}

const runTests = async () => {
  await envTest();
  await postcodeTest();
  await metTest();
}

runTests().then(
  () => console.log("Finished")
)


