import express from 'express';
import dayInfo from './day-info.service';

const router = express.Router();

router.get('/', (req, res) => {
  dayInfo.get().then((data) => {
    res.json(data);
  });
});

module.exports = router;
