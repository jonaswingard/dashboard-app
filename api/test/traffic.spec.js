import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import traffic from '../src/traffic/traffic.service';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Traffic Service', () => {
  it('Get some traffic-info', () =>
    traffic.getTrafficSituation().then((response) => {
      expect(response).to.be.an('array');
    }),
  );

  it('Get realtime information about a site', () =>
    traffic.getRealTimeInformation(1550, 5).then((response) => {
      expect(response).to.be.an('object');
      expect(response.StatusCode).to.equal(0);
      expect(response.ResponseData.Buses).to.be.an('array');
    }),
  );
});
