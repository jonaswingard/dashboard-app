import User from './user.model';
import UserWidget from './userwidget.model';

function moveItem(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

export default {
  add(username, name) {
    return new User({ username, name }).save();
  },

  delete(username) {
    return User.deleteOne({ username });
  },

  getUser(username) {
    return User.findOne({ username });
  },

  addUserWidgets(username, widgetList) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        const widgetItem = new UserWidget({
          user,
          widgetList,
        });

        widgetItem.save().then((item) => {
          resolve(item);
        });
      });
    });
  },

  getUserWidgets(username) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        resolve(UserWidget.findOne({ user: user._id }));
      });
    });
  },

  getUserWidget(username, index) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        UserWidget.findOne({ user: user._id }).then((userWidget) => {
          resolve(userWidget.widgetList[index]);
        });
      });
    });
  },

  updateUserWidget(widgetId, widgetSettings) {
    return new Promise((resolve) => {
      UserWidget.findOne({ 'widgetList._id': widgetId }).then((userWidget) => {
        const widgetIndex = userWidget.widgetList.findIndex(
          widgetItem => widgetItem._id.toString() === widgetId.toString());

        const tempList = userWidget.widgetList;
        tempList[widgetIndex].settings = widgetSettings;

        UserWidget.findOneAndUpdate(
          { 'widgetList._id': widgetId },
          { $set: { widgetList: tempList } }, (err, doc) => {
            resolve(doc);
          },
        );
      });
    });
  },

  getUserWidgetById(widgetId) {
    return new Promise((resolve) => {
      UserWidget.findOne({ 'widgetList._id': widgetId }).then((item) => {
        resolve(item.widgetList.filter(widgetItem => widgetItem._id.toString() === widgetId)[0]);
      });
    });
  },

  moveUserWidget(username, oldIndex, newIndex) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        UserWidget.findOne({ user: user._id }).then((userWidget) => {
          const tempList = userWidget.widgetList;
          moveItem(tempList, oldIndex, newIndex);

          UserWidget.findOneAndUpdate({ user: user._id },
            { $set: { widgetList: tempList } }, (err, doc) => {
              resolve(doc);
            });
        });
      });
    });
  },
};
