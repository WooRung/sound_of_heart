const router = require('express').Router();
const {
  renderIndex,
  renderLogin,
  renderSignup,
  renderVideochat,
  getVideochatId,
} = require('../controllers/site');

const { loginUserRedirect } = require('../middlewares/auth-middleware');

router.get('/', renderIndex);
router.get('/login', loginUserRedirect('/videochat'), renderLogin);
router.get('/signup', loginUserRedirect('/videochat'), renderSignup);

router.get('/videochat', getVideochatId('/videochat'));
router.get('/videochat/:chatId', renderVideochat);

module.exports = router;
