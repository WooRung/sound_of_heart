const router = require('express').Router();
const apiRouter = require('./api');
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const siteRouter = require('./site');
const { v4: uuidv4 } = require('uuid');

router.use('/api', apiRouter);
router.use('/', siteRouter);

router.get('/sock', (req, res) => {
  res.render('socketio_test');
});

router.get('/sock/getRoom', (req, res) => {
  res.redirect(`/sock/${uuidv4()}`);
});

router.get('/sock/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.render('socketio_test', { roomId: roomId });
});

router.get('/chatroom', (req, res) => {
  res.redirect(`/chatroom/${uuidv4()}`);
});
router.get('/chatroom/:roomId', (req, res) => {
  const { roomId } = req.params;
  res.render('chatroom', { roomId: roomId });
});

// router.get('/', function (req, res) {
//   console.log('session', req.session);
//   console.log('cookies', req.cookies);
//   return res.json({ data: 1 });
// });

router.post(
  '/login',
  passport.authenticate('local', { failureLogin: '/login' }),
  (req, res) => {
    console.log('passport 인증');
    console.log(req.session);
    console.log(req.user);
    const token = jwt.sign(req.user, process.env.JWT_SECRET);

    return res.json({ token });
  }
);

router.get(
  '/token',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    console.log(req.user);
    res.json('token auth 완료');
  }
);

router.get('/set-cookie', function (req, res) {
  console.log(req.user);
  console.log(req.session);
  res.cookie('cookieName', req.ip, { MaxAge: 1000 * 60 * 2 }).json({
    data: 'cookie 생성 완료.',
  });
});

router.get('/set-session', function (req, res) {
  req.session.data = 'data';
  res.json({ data: 'session 생성' });
});

module.exports = router;
