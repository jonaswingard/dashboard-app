import express from 'express';
import pocket from './service/pocket';

const router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/pocket', function(req, res) {
  const limit = req.query.limit ? req.query.limit : 0;

  pocket.get(limit).then((data) => {
    res.json(data);
  });
});

router.get('/pocket/all', function(req, res) {
  pocket.get().then((data) => {
    res.json(data);
  });
});

module.exports = router;
