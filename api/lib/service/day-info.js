import dateFormat from 'dateformat';
import request from 'request';

const apiURL = 'http://api.dryg.net/dagar/v2.1/';

export default {
  get(date = new Date()) {
    const formattedDate = dateFormat(date, 'yyyy/mm/dd');
    const url = apiURL + formattedDate;

    return new Promise(resolve => {

      request(url, function (error, response, body) {
        resolve(JSON.parse(body));
      });
    });
  }
}
