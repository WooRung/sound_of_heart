/**
 * Module Dependencies
 */
const router = require('express').Router();
const jwt = require('jsonwebtoken');

/**
 * Project Dependencies
 */
const passport = require('../passport');
const { createUser } = require('../controllers/user');

/**
 * login.
 */
router.post('/getToken', passport.authenticate('local', {}), (req, res) => {
  res.json({
    token: jwt.sign(req.user, process.env.JWT_SECRET),
  });
});

router.post('/register', createUser);

module.exports = router;
