const router = require('express').Router();
const { createUser } = require('../controllers/user');
const articleRouter = require('./article-api');

router.post('/user', createUser);
router.use('/article', articleRouter);

module.exports = router;
