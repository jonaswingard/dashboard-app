import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import userService from '../lib/user/user.service';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Pocket Service', () => {
  it('Get a list of user widgets', () =>
    userService.getWidgets().then((response) => {
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('componentName');
    }),
  );
});
