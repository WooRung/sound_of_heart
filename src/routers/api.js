const router = require('express').Router();
const { createUser } = require('../controllers/user');

router.post('/user', createUser);

module.exports = router;
