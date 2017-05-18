import express from 'express';
import pocket from './pocket.service';

const router = express.Router();

router.get('/', (req, res) => {
  const limit = req.query.limit ? req.query.limit : 0;

  pocket.get(limit).then((data) => {
    res.json(data);
  });
});

router.get('/all', (req, res) => {
  pocket.get().then((data) => {
    res.json(data);
  });
});

router.post('/archive', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.archive(req.body.id).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

router.post('/delete', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.delete(req.body.id).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

router.post('/tag', (req, res) => {
  const limit = req.body.limit ? req.body.limit : 0;

  pocket.tag(req.body.id, req.body.tag, req.body.removeTag).then(() => {
    pocket.get(limit).then((data) => {
      res.json(data);
    });
  });
});

module.exports = router;
