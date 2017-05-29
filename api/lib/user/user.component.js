import express from 'express';
import userService from './user.service';

const router = express.Router();

router.get('/widgets', (req, res) => {
  userService.getWidgets().then((data) => {
    res.json(data);
  });
});

module.exports = router;
