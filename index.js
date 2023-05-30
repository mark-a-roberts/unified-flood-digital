const hapi = require('@hapi/hapi')
const server = hapi.server({
  host: 'localhost',
  port: 3000
})

const routes = require('./routes');

const env = require( './server/api/floodApi.js');
const metOffice = require( './server/api/fgs.js');

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



async function start() {
  await server.register([{
    plugin: require('@envage/hapi-govuk-frontend'),
    options: {
      analyticsAccount: 'UA-123456789-0',
      assetPath: '/assets',
      assetDirectories: ['public/static', 'public/build'],
      serviceName: 'Unified Flood',
      viewPath: 'views',
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

  await server.ext('onPreResponse', (request, reply) => {

    if (request.response.isBoom) {
      const err = request.response;
      const errName = err.output.payload.error;
      const statusCode = err.output.payload.statusCode;

      return reply.view('error', {
        statusCode: statusCode,
        errName: errName
      })
        .code(statusCode);
    }

    return reply.continue;
  });

  await server.route(routes);

  await server.start()
  console.log('Server started at: ' + server.info.uri);

}

apiStart();

start()

