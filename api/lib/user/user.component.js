import express from 'express';
import userService from './user.service';

const router = express.Router();

router.get('/widgets', (req, res) => {
  const username = 'foobar';
  userService.getUserWidgets(username).then((data) => {
    res.json(data);
  });
});

router.post('/widget/save', (req, res) => {
  userService.updateUserWidget(req.body.id, req.body.settings).then((data) => {
    res.json(data);
  });
});


module.exports = router;
