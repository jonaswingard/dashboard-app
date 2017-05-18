import express from 'express';

import pocket from './service/pocket';
import dayInfo from '../lib/service/day-info';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our api!' });
});

router.get('/pocket', (req, res) => {
  const limit = req.query.limit ? req.query.limit : 0;

  pocket.get(limit).then((data) => {
    res.json(data);
  });
});

router.get('/pocket/all', (req, res) => {
  pocket.get().then((data) => {
    res.json(data);
  });
});

router.post('/pocket/archive', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.archive(req.body.id).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

router.post('/pocket/delete', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.delete(req.body.id).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

router.post('/pocket/tag', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.tag(req.body.id, req.body.tag, req.body.removeTag).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

router.get('/dayinfo', (req, res) => {
  dayInfo.get().then((data) => {
    res.json(data);
  });
});

module.exports = router;
