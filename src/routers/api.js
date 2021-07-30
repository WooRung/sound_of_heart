const router = require('express').Router();
const articleRouter = require('./article-api');
const authAPIRouter = require('./auth-api');
const { videoLimiter } = require('../middlewares/limter-middleware');

router.use('/article', articleRouter);
router.use('/auth', authAPIRouter);

// /api/videolimit
router.post('/videolimit', videoLimiter(), (req, res) => {
  const { useTime } = req.body;
  req.session.video.useTime += useTime;
  console.log('video 사용량: ', req.session.video.useTime);
  res.send('ok');
});

module.exports = router;
