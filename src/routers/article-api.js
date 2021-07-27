const router = require('express').Router();
const {
  createArticle,
  retrieveArticle,
  retrieveOneArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/article');

router.post('/', createArticle);
router.get('/', retrieveArticle);
router.get('/:articleId', retrieveOneArticle);
router.put('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
