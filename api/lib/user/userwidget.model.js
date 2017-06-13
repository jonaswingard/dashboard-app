import mongoose from 'mongoose';

const userWidgetSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  widgetList: [{
    componentName: String,
    userId: String,
    settings: {},
  }],
});

const UserWidget = mongoose.model('UserWidget', userWidgetSchema);

module.exports = UserWidget;
