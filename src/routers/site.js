const router = require('express').Router();
const {
  renderIndex,
  renderLogin,
  renderSignup,
  renderVideochat,
  getVideochatId,
} = require('../controllers/site');

router.get('/', renderIndex);
router.get('/login', renderLogin);
router.get('/signup', renderSignup);
router.get('/videochat', getVideochatId('/videochat'));
router.get('/videochat/:chatId', renderVideochat);

module.exports = router;
