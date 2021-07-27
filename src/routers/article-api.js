const router = require('express').Router();
const {
  createArticle,
  retrieveArticle,
  retrieveOneArticle,
  updateArticle,
  deleteArticle,
  addComment,
  getCommentsByArticleId,
  deleteComment,
  updateComment,
} = require('../controllers/article');

router.post('/', createArticle);
router.get('/', retrieveArticle);
router.get('/:articleId', retrieveOneArticle);
router.put('/:articleId', updateArticle);
router.delete('/:articleId', deleteArticle);

// Comment 명세
// POST     '/:articleId/comment'
// GET      '/:articleId/comment'
// GET      '/:articleId/comment/:commentId' X
// PUT      '/:articleId/comment/:commentId'
// DELETE   '/:articleId/comment/:commentId'
router.post('/:articleId/comment', addComment);
router.get('/:articleId/comment', getCommentsByArticleId);
router.put('/:articleId/comment/:commentId', updateComment);
router.delete('/:articleId/:commentId', deleteComment);

module.exports = router;
