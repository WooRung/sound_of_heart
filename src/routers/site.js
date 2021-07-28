const router = require('express').Router();
const {
  renderIndex,
  renderLogin,
  renderSignup,
  renderVideochat,
} = require('../controllers/site');

router.get('/', renderIndex);
router.get('/login', renderLogin);
router.get('/signup', renderSignup);
router.get('/videochat', renderVideochat);

module.exports = router;
