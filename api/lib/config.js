export default {
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-Accept': 'application/json'
  },
  consumer_key: process.env.POCKET_CONSUMER_KEY,
  access_token: process.env.POCKET_ACCESS_TOKEN,
  urls: {
    get: 'https://getpocket.com/v3/get'
  }
};
