import request from 'request';
import config from'../config';

export default {
  get(limit) {
    const options = {
      headers: config.headers,
      url: config.urls.get,
      body: `consumer_key=${config.consumer_key}&access_token=${config.access_token}&count=${limit}&detailType=complete&sort=newest`
    };

    function cleanResponse(data) {
      return Object.keys(data).map(item => {
        const newItem = data[item];
        if (newItem.tags) {
          newItem.pretty_tags = Object.keys(newItem.tags).map(tag => newItem.tags[tag]);
        }

        newItem.pretty_time_added = new Date(newItem.time_added * 1000);
        newItem.pretty_time_updated = new Date(newItem.time_updated * 1000);

        return newItem;
      });
    }

    return new Promise(resolve => {
      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }

        if (res && res.statusCode !== 500) {
          // Make the response into an array and add some info the objects
          var response = cleanResponse(JSON.parse(body).list);

          // Sort by time added
          response.sort((a, b) => parseFloat(b.time_added) - parseFloat(a.time_added));

          resolve(response);
        }
      });
    });
  },

  archive(id) {
    return new Promise(resolve => {
      // let action = `[{"action":"archive","time":1348853312,"item_id":${id}}]`;
      let action = `[{"action":"archive","item_id":${id}}]`;
      action = encodeURIComponent(action);
      const body = `consumer_key=${config.consumer_key}&access_token=${config.access_token}&actions=${action}`;

      const options = {
        headers: config.headers,
        url: config.urls.send,
        body: body
      };

      request.post(options, (err, res, body) => {
        if (err) {
          console.log(err);
        }

        if (res.statusCode !== 500) {
          resolve(body);
        } else {
          console.log('Error 500!');
        }
      });

    });
  }
}
