export default {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-Accept': 'application/json',
  },
  pocket: {
    consumer_key: process.env.POCKET_CONSUMER_KEY,
    access_token: process.env.POCKET_ACCESS_TOKEN,
    urls: {
      get: 'https://getpocket.com/v3/get',
      add: 'https://getpocket.com/v3/add',
      send: 'https://getpocket.com/v3/send',
    },
  },
  SL: {
    realtimeInformation: process.env.SL_REALTIMEINFORMATION,
    locationLookup: process.env.SL_LOCATIONLOOKUP,
    tripPlanner: process.env.SL_TRIPPLANNER,
    trafficSituation: process.env.SL_TRAFFICSITUATION,
    disturbanceInformation: process.env.SL_DISTURBANCEINFORMATION,
  },
};
