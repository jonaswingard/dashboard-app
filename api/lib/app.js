// get pocket items
// connect them to angular

import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  app.get('http://www.google.com', function(req, res) {
    console.log(res);
  });
  res.send('Custom API')
});

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});

module.exports = app;
