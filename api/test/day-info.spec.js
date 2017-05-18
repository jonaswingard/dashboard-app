import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import dayInfo from '../lib/service/day-info';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Pocket Service', () => {
  it('Get a name for today', () =>
    dayInfo.get().then((response) => {
      expect(response).to.have.deep.property('dagar');
      expect(response.dagar).to.be.an('array');
      expect(response.dagar[0].namnsdag).to.have.length.above(0);
    }),
  );
});
