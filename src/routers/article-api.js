const router = require('express').Router();
const {
  createArticle,
  retrieveArticle,
  retrieveOneArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article');

router.post('/', createArticle);

module.exports = router;
