import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import user from '../lib/user/user.service';

chai.use(chaiAsPromised);
const { expect } = chai;

describe.only('Widgets and users', () => {
  const deleteUser = true;
  const userName = 'testuser';
  const mockWidget1 = {
    componentName: 'testwidget1',
    settings: [{ ComponentTitle: 'testwidget title 1' }],
  };
  const mockWidget2 = {
    componentName: 'testwidget2',
    settings: [{ ComponentTitle: 'testwidget title 2' }],
  };

  let addedWidgetId = '';

  after((done) => {
    if (deleteUser) {
      user.delete(userName).then(() => {
        console.log(`User with username: ${userName} has been removed.`);
        done();
      });
    } else {
      done();
    }
  });

  it('Add a user', () =>
    user.add(userName, 'Test User').then((response) => {
      expect(response).to.be.an('object');
      expect(response.username).to.equal(userName);
    }),
  );

  it('Add a user a second time, should throw an error', () =>
    user.add(userName, 'Test User').catch((error) => {
      expect(error).to.be.an('object');
    }),
  );

  it('Add a widget', () =>
    user.addUserWidget(userName, mockWidget1).then((response) => {
      expect(response).to.be.an('object');
    }),
  );

  it('Add another widget', () =>
    user.addUserWidget(userName, mockWidget2).then((response) => {
      expect(response).to.be.an('object');
    }),
  );

  it('Get all user widgets', () =>
    user.getUserWidgetItem(userName).then((response) => {
      expect(response).to.be.an('object');
      expect(response.widgetList).to.be.an('array');
      expect(response.widgetList).to.have.length.above(0);
      addedWidgetId = response.widgetList[0]._id;
    }),
  );

  it('Get specific widget by id', () =>
    user.getUserWidgetById(addedWidgetId).then((response) => {
      expect(response).to.be.an('object');
      expect(response.componentName).to.be.a('string');
    }),
  );

  it('Get specific widget by index', () =>
    user.getUserWidgetByIndex(userName, 0).then((response) => {
      expect(response).to.be.an('object');
      expect(response.componentName).to.be.a('string');
    }),
  );

  it('Change position of a widget', (done) => {
    user.moveUserWidget(userName, 0, 1).then(() => {
      user.getUserWidgetByIndex(userName, 0).then((widget) => {
        expect(widget.componentName).to.equal(mockWidget2.componentName);
        done();
      });
    });
  });

  it('Update widget', (done) => {
    user.getUserWidgetById(addedWidgetId).then((widget) => {
      const updatedTitle = 'updated title';
      const tempWidget = widget;
      tempWidget.settings[0].ComponentTitle = updatedTitle;

      user.updateUserWidget(tempWidget._id, tempWidget.settings).then(() => {
        user.getUserWidgetById(addedWidgetId).then((updatedWidget) => {
          expect(updatedWidget).to.be.an('object');
          expect(updatedWidget.settings[0].ComponentTitle).to.equal(updatedTitle);
          done();
        });
      });
    });
  });
});
