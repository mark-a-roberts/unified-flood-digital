const hapi = require('@hapi/hapi')
const server = hapi.server({
  host: 'localhost',
  port: 3000
})

const routes = [
  // national page
  {
    method: ['GET'],
    path: '/',
    handler: (request, h) => {
      // get data here
      const results = {
        area: 'England',
        overview: [
          'Overview'
        ],
        forecast: [
          'Currently the chance of flooding in the next 5 days is low,' +
          'not much rain has fallen in the past 24 hours but river levels are higher than average.'
        ]
      }
      return h.view('national', {
        pageHeading: 'Flooding in ' + results.area,
        pageText: 'National page',
        ...results
      })
    }
  },
  // area level
  {
    method: ['GET'],
    path: '/town/{id}',
    handler:  (request, h) => {


      // map id to area here... request.params.id
      const results = {
        area: 'Hebden Bridge',
        overview: [
          'Hebden Bridge is an area that has a high risk of flooding in many places.',
          '27 flood warnings have been issued here in the past 10 years. There have also been 2 severe flood warnings. Get flood warnings by phone, text or email.',
          'There are places in Hebden Bridge that have a high chance of localised flash flooding during heavy rain.',
          'Climate change will mean that flooding happens more often'
        ],
        forecast: [
          'Flooding is possible in the next 24 hours. There is a flood warning in place for this area.'
        ],
        levels: [
          {
            title: "River levels",
            text: "The rivers in the area are normal and steady",
            link: 'View river levels',
            href: '#'
          },
          {
            title: "Rainfail levels",
            text: "The rainfall in the area has been slightly higher than normal in the past 24hr",
            link: 'View rainfall levels',
            href: '#'
          },
        ]
      }
      return h.view('area', {
        pageHeading: 'Flooding in ' + results.area,
        pageText: 'Town page',
        ...results
      })
    }
  },
  {
    method: ['GET'],
    path: '/property/{id}',
    handler: (request, h) => {
      // map id to area here... request.params.id
      const results = {
        warning: { active: true },
        risk: { level: 4 },
        property: '2, Generic Road, Hebden Bridge, HX7 6GN',
        area: 'Hebden Bridge',
        overview: [
          'Hebden Bridge is an area that has a high risk of flooding in many places.',
          '27 flood warnings have been issued here in the past 10 years. There have also been 2 severe flood warnings. Get flood warnings by phone, text or email.',
          'There are places in Hebden Bridge that have a high chance of localised flash flooding during heavy rain.',
          'Climate change will mean that flooding happens more often'
        ],
        sources: [
          {
            title: 'Rivers',
            risk: 4,
            text: 'This property is at very high risk of flooding from rivers in the area.'
          },
          {
            title: 'Surface Water',
            risk: 3,
            text: 'This property is at high risk of flooding when there is heavy rain that can not drain away quickly enough.'
          },
          {
            title: 'Ground Water',
            risk: 1,
            text: 'This property has a very low risk of flooding from water coming from underground.'
          }
        ]
      }
      return h.view('property', {
        pageHeading: 'Flood Risk',
        pageText: 'Flooding in ' + results.area,
        ...results
      })
    }
  }
]

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

start()

