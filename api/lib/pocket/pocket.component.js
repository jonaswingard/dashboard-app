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
  pocket.archive(req.body.id).then((data) => {
    res.json(data);
  });
});

router.post('/delete', (req, res) => {
  pocket.delete(req.body.id).then((data) => {
    res.json(data);
  });
});

router.post('/tag', (req, res) => {
  pocket.tag(req.body.id, req.body.tag, req.body.removeTag).then((data) => {
    res.json(data);
  });
});

module.exports = router;
