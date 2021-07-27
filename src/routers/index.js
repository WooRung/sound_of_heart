const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/', function (req, res) {
  console.log('session', req.session);
  console.log('cookies', req.cookies);
  return res.json({ data: 1 });
});

router.get('/set-cookie', function (req, res) {
  res.cookie('cookieName', req.ip, { MaxAge: 1000 * 60 * 2 }).json({
    data: 'cookie 생성 완료.',
  });
});

router.get('/set-session', function (req, res) {
  req.session.data = 'data';
  res.json({ data: 'session 생성' });
});

module.exports = router;
