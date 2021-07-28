const router = require('express').Router();
const articleRouter = require('./article-api');
const authAPIRouter = require('./auth-api');
const siteRouter = require('./site');

router.use('/article', articleRouter);
router.use('/auth', authAPIRouter);
router.use('/', siteRouter);

module.exports = router;
