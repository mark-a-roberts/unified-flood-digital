const postcodeAPI = require('../server/api/postcode');
const fgsAPI = require('../server/api/fgs');

const toCaps = (sentence) => {
  const words = sentence.split(" ");

  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(" ");
}

const routes = [
  // national page
  {
    method: ['GET'],
    path: '/',
    handler: async (request, h) => {
      // get FGS latest
      const fgs = await fgsAPI.statement('latest');

      console.log(fgs)

      const forecast = fgs?.statement?.public_forecast

      const summary = forecast?.england_forecast || 'No forecast is available for England.'
      const ts = new Date( forecast?.published_at);
      const tsOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      // get data here
      const results = {
        area: 'England',
        overview: [
        ],
        forecast: [
          '<p class="govuk-body">' + summary + '</p>',
          '<hr>',
          '<i>Updated at ' + ts.toLocaleString(undefined, tsOptions) + '</i>'

        ]
      }
      return h.view('national', {
        pageHeading: 'Flooding in ' + results.area,
        pageText: 'National page',
        ...results
      })
    }
  },

  // area
  {
    method: ['POST'],
    path: '/area',
    handler:  (request, h) => {
      const results = {};
      return h.view('home', {
        pageHeading: 'Area',
        pageText: 'Area text',
        ...results
      })
    }
  },
  // area level
  {
    method: ['GET'],
    path: '/town/{id}',
    handler:  (request, h) => {

      const area = toCaps( request.params.id.replace('.', ' '));

      const results = {
        area,
        overview: [
          area + ' is an area that has a high risk of flooding in many places.',
          '27 flood warnings have been issued here in the past 10 years. There have also been 2 severe flood warnings. Get flood warnings by phone, text or email.',
          'There are places in ' + area + ' that have a high chance of localised flash flooding during heavy rain.',
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
            title: "Rainfall levels",
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
    path: '/postcode/{id}',
    handler: async (request, h) => {
      // get postcode details
      // convert - to space
      const postcode = request.params.id.replace('.', ' ');
      console.log(  request.params.id, ' => ', postcode);

      const postCodeResult = await postcodeAPI.postcode(postcode);
      console.log(  postCodeResult);

      if (!postCodeResult || postCodeResult.status !== 200 ) {
        // no postcode
        return h.view('error', {
          statusCode: 404,
          errName: 'Postcode not found'
        })
          .code(404);
      }
      const details = postCodeResult.result;
      const area = details.admin_ward;

      // map id to area here... request.params.id
      const results = {
        warning: { active: true },
        risk: { level: 4 },
        property: [ area, details.pfa, details.postcode ].join( ','),
        area,
        overview: [
          area + ' is an area that has a high risk of flooding in many places.',
          '27 flood warnings have been issued here in the past 10 years. There have also been 2 severe flood warnings. Get flood warnings by phone, text or email.',
          'There are places in ' + area + ' that have a high chance of localised flash flooding during heavy rain.',
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
        pageText: 'Flooding in ' + results.property,
        ...results
      })
    }
  },
  {
    method: ['GET'],
    path: '/property/{id}',
    handler: (request, h) => {
      // map id to area here... request.params.id
      const area = toCaps( request.params.id.replace('.', ' '));

      const results = {
        warning: { active: true },
        risk: { level: 4 },
        property: [ '2, Generic Road', area, 'HX7 6GN'].join(', '),
        area,
        overview: [
          area + ' is an area that has a high risk of flooding in many places.',
          '27 flood warnings have been issued here in the past 10 years. There have also been 2 severe flood warnings. Get flood warnings by phone, text or email.',
          'There are places in ' + area + ' that have a high chance of localised flash flooding during heavy rain.',
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

module.exports = routes;
