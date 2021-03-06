import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import pocket from './pocket/pocket.component';
import dayInfo from './day-info/day-info.component';
import traffic from './traffic/traffic.component';
import user from './user/user.component';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Custom API');
});

app.use('/api/dayinfo', dayInfo);
app.use('/api/pocket', pocket);
app.use('/api/traffic', traffic);
app.use('/api/user', user);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECTION, { auth: { authdb: 'admin' } });

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
