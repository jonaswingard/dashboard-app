import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import traffic from '../lib/traffic/traffic.service';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Traffic Service', () => {
  it('Get some traffic-info', () =>
    traffic.getTrafficSituation().then((response) => {
      expect(response).to.be.an('array');
    }),
  );
});
