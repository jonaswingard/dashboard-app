import express from 'express';
import bodyParser from 'body-parser';
import pocket from './pocket/pocket.component';
import dayInfo from './day-info/day-info.component';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Custom API');
});

app.use('/api/dayinfo', dayInfo);
app.use('/api/pocket', pocket);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
