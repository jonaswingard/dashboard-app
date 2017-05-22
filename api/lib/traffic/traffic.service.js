import SL from 'sl-api';
import request from 'request';
import config from '../config';

const sl = new SL({
  realtimeInformation: config.SL.realtimeInformation,
  locationLookup: config.SL.locationLookup,
  tripPlanner: config.SL.tripPlanner,
  trafficSituation: config.SL.trafficSituation,
  disturbanceInformation: config.SL.disturbanceInformation,
});

// return sl.disturbanceInformation.deviations();

export default {
  getTrafficSituation() {
    return sl.trafficSituation();
  },
  getLocation(query) {
    return sl.locationLookup({ searchstring: query });
  },
  getRealTimeInformation(siteId, timeWindow) {
    return new Promise((resolve) => {
      const url = 'http://api.sl.se/api2/realtimedeparturesV4.json';
      const parameters = `?key=${config.SL.realtimeInformation}&siteid=${siteId}&timewindow=${timeWindow}`;

      return request.get({ url: `${url}${parameters}` }, (err, res, body) => {
        resolve(JSON.parse(body));
      });
    });
  },
  getTrip(originId, destinationId) {
    return sl.tripPlanner.trip({ originId, destId: destinationId });
  },
};
