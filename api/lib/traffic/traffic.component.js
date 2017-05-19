import express from 'express';
import traffic from './traffic.service';

const router = express.Router();

router.get('/info', (req, res) => {
  traffic.getTrafficSituation().then((data) => {
    res.json(data);
  });
});

module.exports = router;
