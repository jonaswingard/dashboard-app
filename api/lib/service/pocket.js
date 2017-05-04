import request from 'request';
import config from'../config';

export default {
  get(limit) {
    const options = {
      headers: config.headers,
      url: config.urls.get,
      body: `consumer_key=${config.consumer_key}&access_token=${config.access_token}&count=${limit}`
    };

    return new Promise(resolve => {
      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }
        resolve(JSON.parse(body));
      });
    });
  }
}
