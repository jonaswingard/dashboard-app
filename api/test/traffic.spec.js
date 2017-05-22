import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import traffic from '../lib/traffic/traffic.service';

require('dotenv').load();

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Traffic Service', () => {
  it('Get some traffic-info', () =>
    traffic.getTrafficSituation().then((response) => {
      expect(response).to.be.an('array');
    }),
  );

  it('Get realtime information about a site', () =>
    traffic.getRealTimeInformation('1550').then((response) => {
      expect(response).to.be.an('object');
      expect(response.StatusCode).to.equal(0);
      expect(response.ResponseData.Buses).to.be.an('array');
    }),
  );
});
