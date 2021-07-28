const router = require('express').Router();
const articleRouter = require('./article-api');
const authAPIRouter = require('./auth-api');

router.use('/article', articleRouter);
router.use('/auth', authAPIRouter);

module.exports = router;
