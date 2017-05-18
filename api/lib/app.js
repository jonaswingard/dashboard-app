import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Custom API');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

module.exports = app;
