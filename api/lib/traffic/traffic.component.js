import express from 'express';
import traffic from './traffic.service';

const router = express.Router();

router.get('/info', (req, res) => {
  traffic.getTrafficSituation().then((data) => {
    res.json(data);
  });
});

router.post('/location', (req, res) => {
  traffic.getLocation(req.body.query).then((data) => {
    res.json(data);
  });
});

router.post('/realtime', (req, res) => {
  traffic.getRealTimeInformation(req.body.siteid).then((data) => {
    res.json(data);
  });
});

module.exports = router;
