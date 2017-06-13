import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import user from '../lib/user/user.service';

chai.use(chaiAsPromised);
const { expect } = chai;

describe.only('Widgets', () => {
  const userName = 'foobar';

  it.skip('Delete a user', () =>
    user.delete(userName).then((response) => {
      expect(response).to.be.an('object');
      expect(response.deletedCount).to.be.equal(1);
    }),
  );

  it.skip('Add a user', () =>
    user.add(userName, 'Jonas Wingård').then((response) => {
      expect(response).to.be.an('object');
      expect(response.username).to.equal(userName);
    }),
  );

  it.skip('Add userwidgets', () =>
    user.addUserWidgets(userName, []).then((response) => {
      expect(response).to.be.an('object');
    }),
  );

  it.skip('Get all user widgets', () =>
    user.getUserWidgets(userName).then((response) => {
      console.log(response);
      expect(response).to.be.an('object');
      expect(response.widgetList).to.be.an('array');
      expect(response.widgetList).to.have.length.above(0);
    }),
  );

  it.skip('Get specific widget by index', () =>
    user.getUserWidget(userName, 1).then((response) => {
      console.log(response);
      expect(response).to.be.an('object');
      expect(response.componentName).to.be.a('string');
    }),
  );

  it.skip('Change position of a widget', () =>
    user.moveUserWidget(userName, 0, 2).then((response) => {
      console.log(response);
      // expect(response).to.be.a('string');
    }),
  );

  it('Update widget', (done) => {
    user.getUserWidgetById('593a4eebc61d8f1bd8cc7e08').then((widget) => {
      expect(widget).to.be.an('object');
      const tempWidget = widget;
      tempWidget.settings.ComponentTitle = 'a very new title...';

      user.updateUserWidget(tempWidget._id, tempWidget.settings).then((response) => {
        expect(response).to.be.an('object');
        done();
      });
    });
  });
});
