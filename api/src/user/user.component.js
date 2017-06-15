import express from 'express';
import userService from './user.service';

const router = express.Router();

router.post('/add', (req, res) => {
  userService.add(req.body.username, req.body.name).then((response) => {
    res.json(response);
  });
});

router.post('/delete', (req, res) => {
  userService.delete(req.body.username).then((response) => {
    res.json(response);
  });
});

router.post('/widgets', (req, res) => {
  userService.getUserWidgetItem(req.body.username).then((data) => {
    res.json(data);
  });
});

router.post('/widget/save', (req, res) => {
  userService.updateUserWidget(req.body.id, req.body.settings).then((data) => {
    res.json(data);
  });
});

router.post('/widget/add', (req, res) => {
  userService.addUserWidget(req.body.username, req.body.widget).then((response) => {
    res.json(response);
  });
});

router.post('/widget/delete', (req, res) => {
  userService.deleteUserWidget(req.body.widgetid).then((response) => {
    res.json(response);
  });
});


module.exports = router;
