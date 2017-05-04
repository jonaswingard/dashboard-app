export default {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-Accept': 'application/json'
  },
  consumer_key: '66586-3bdb7702d435be12c60b80dd' || process.env.CONSUMER_KEY,
  access_token: 'ce75139e-5db0-21a6-f14e-10e031' || process.env.ACCESS_TOKEN,
  urls: {
    get: 'https://getpocket.com/v3/get'
  }
};
