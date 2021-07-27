const router = require('express').Router();
const {
  createArticle,
  retrieveArticle,
  retrieveOneArticle,
  updateArticle,
  deleteArticle,
  addComment,
} = require('../controllers/article');

router.post('/', createArticle);
router.get('/', retrieveArticle);
router.get('/:articleId', retrieveOneArticle);
router.put('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);

// Comment 명세
// GET      '/:articleId/comment'
// GET      '/:articleId/comment/:commentId' X
// POST     '/:articleId/comment'
// PUT      '/:articleId/comment/:commentId'
// DELETE   '/:articleId/comment/:commentId'
router.post('/:articleId/comment', addComment);
module.exports = router;
