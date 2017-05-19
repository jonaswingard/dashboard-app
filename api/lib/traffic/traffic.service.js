import SL from 'sl-api';

const sl = new SL({
  realtimeInformation: '3c711ccbaa084b278e1ac5a3ac0f7c61',
  locationLookup: 'd6409a7178dc4c66a52feb76efa82e7e',
  tripPlanner: '94ed4d7fb12149188018f0a0fa021946',
  trafficSituation: '43dcdaaa365047818fe22f24acd4c8a1',
  disturbanceInformation: 'ed814538dbd5426fa5d494df0a36a060',
});

export default {
  getTrafficSituation() {
    // return sl.tripPlanner.trip({originId: 9118, destId: 9507});
    // return sl.locationLookup({searchstring: "tegnergatan"});
    return sl.trafficSituation();
    // return sl.disturbanceInformation.deviations();
  },
};
