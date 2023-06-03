const hapi = require('@hapi/hapi')
const routes = require('./routes');
const env = require( './api/floodApi');
// const metOffice = require( 'api/fgs');
// const postcode = require( 'api/postcode');



let floodAreas = {}

let floods = {};


/**
 * get update from API periodically
 * @returns {Promise<void>}
 */
const floodUpdate = async() => {
  const result = await env.floods();
  if (result) {
    floods = result;
  }
}

const apiStart = async () => {
  const result = await env.floodAreas();
  if (result) {
    floodAreas = result;
  }

  await floodUpdate();

}


async function createServer() {

  const server = hapi.server({
    host: 'localhost',
    port: 3000
  })

  await server.register([{
    plugin: require('@envage/hapi-govuk-frontend'),
    options: {
      analyticsAccount: 'UA-123456789-0',
      assetPath: '/assets',
      assetDirectories: ['public/static', 'public/build'],
      serviceName: 'Unified Flood',
      viewPath: 'server/views',
      includePaths: [
        // folders where partial views and macros can be found
        // if this is not specified (not recommended) an attempt will be made crawling the node_modules to find the paths
        'node_modules/govuk-frontend'
        // 'node_modules/@ministryofjustice/frontend'
      ],
      options: {
        tags: ['asset']
      },
      context: {
        data: 'some data'
      }
    }
  }])

  await server.ext('onPreResponse', (request, h) => {

    if (request.response.isBoom) {
      const err = request.response;
      const errName = err.output.payload.error;
      const statusCode = err.output.payload.statusCode;

      return h.view('error', {
        statusCode: statusCode,
        errName: errName
      })
        .code(statusCode);
    }

    return h.continue;
  });

  await server.route(routes);


  await apiStart();

  console.log('Server started at: ' + server.info.uri);
  return server;
}

module.exports = createServer;