import request from 'request';
import config from '../config';

function getOptions(url, additionalBody) {
  return {
    headers: config.headers,
    url,
    body: `consumer_key=${config.pocket.consumer_key}&access_token=${config.pocket.access_token}${additionalBody}`,
  };
}

export default {
  get(limit) {
    const options = getOptions(config.pocket.urls.get, `&count=${limit}&detailType=complete&sort=newest`);

    function cleanResponse(data) {
      return Object.keys(data).map((item) => {
        const newItem = data[item];
        if (newItem.tags) {
          newItem.pretty_tags = Object.keys(newItem.tags).map(tag => newItem.tags[tag]);
        }

        newItem.pretty_time_added = new Date(newItem.time_added * 1000);
        newItem.pretty_time_updated = new Date(newItem.time_updated * 1000);

        return newItem;
      });
    }

    return new Promise((resolve) => {
      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }

        if (res && res.statusCode !== 500) {
          // Make the response into an array and add some info the objects
          const response = cleanResponse(JSON.parse(body).list);
          // Sort by time added
          response.sort((a, b) => parseFloat(b.time_added) - parseFloat(a.time_added));

          resolve(response);
        }
      });
    });
  },

  add(url) {
    return new Promise((resolve) => {
      const options = getOptions(config.pocket.urls.add, `&url=${url}`);

      request.post(options, (err, res, body) => {
        resolve(JSON.parse(body));
      });
    });
  },

  archive(id) {
    return new Promise((resolve) => {
      const action = encodeURIComponent(`[{"action":"archive","item_id":"${id}"}]`);
      const options = getOptions(config.pocket.urls.send, `&actions=${action}`);

      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }

        resolve(JSON.parse(body));
      });
    });
  },

  tag(id, tagName, remove) {
    return new Promise((resolve, reject) => {
      const actionName = !remove ? 'tags_add' : 'tags_remove';
      const action = encodeURIComponent(`[{"action":"${actionName}","item_id":"${id}","tags":"${tagName}"}]`);
      const options = getOptions(config.pocket.urls.send, `&actions=${action}`);

      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(JSON.parse(body));
      });
    });
  },

  delete(id) {
    return new Promise((resolve) => {
      const action = encodeURIComponent(`[{"action":"delete","item_id":"${id}"}]`);
      const options = getOptions(config.pocket.urls.send, `&actions=${action}`);

      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }

        resolve(JSON.parse(body));
      });
    });
  },
};
