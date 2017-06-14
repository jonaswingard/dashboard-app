import User from './user.model';
import UserWidget from './userwidget.model';

function moveItem(array, from, to) {
  array.splice(to, 0, array.splice(from, 1)[0]);
}

export default {
  add(username, name) {
    return new Promise((resolve, reject) =>
      new User({ username, name }).save((error, data) => {
        if (error) {
          reject(error);
        } else {
          this.addUserWidgetItem(data._id).then(() => resolve(data));
        }
      }),
    );
  },

  delete(username) {
    return new Promise((resolve, reject) => {
      this.getUser(username).then((user) => {
        this.deleteUserWidgetItem(user._id).then(() => {
          User.deleteOne({ username }, (userError, writeOpResult) => {
            if (userError) {
              reject(userError);
            }
            resolve(writeOpResult);
          });
        });
      });
    });
  },

  getUser(username) {
    return User.findOne({ username });
  },

  addUserWidgetItem(userId) {
    return new Promise((resolve) => {
      const widgetItem = new UserWidget({
        user: userId,
        widgetList: [],
      });

      widgetItem.save().then((item) => {
        resolve(item);
      });
    });
  },

  deleteUserWidgetItem(userId) {
    return UserWidget.deleteOne({ user: userId });
  },

  getUserWidgetItem(username) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        resolve(UserWidget.findOne({ user: user._id }));
      });
    });
  },

  getUserWidgetById(widgetId) {
    return new Promise((resolve) => {
      UserWidget.findOne({ 'widgetList._id': widgetId }).then((item) => {
        resolve(item.widgetList.filter(
          widgetItem => widgetItem._id.toString() === widgetId.toString())[0]);
      });
    });
  },

  getUserWidgetByIndex(username, index) {
    return new Promise((resolve) => {
      User.findOne({ username }).then((user) => {
        UserWidget.findOne({ user: user._id }).then((userWidget) => {
          resolve(userWidget.widgetList[index]);
        });
      });
    });
  },

  addUserWidget(username, widget) {
    return new Promise((resolve) => {
      this.getUserWidgetItem(username).then((userWidgetItem) => {
        userWidgetItem.widgetList.push(widget);
        userWidgetItem.save().then(() => {
          resolve(userWidgetItem);
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
