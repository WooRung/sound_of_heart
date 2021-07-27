const Article = require('../models/article');
const Comment = require('../models/comment');

module.exports = {
    createArticle,retrieveArticle, retrieveOneArticle, 
    updateArticle, deleteArticle, addComment
}
/**
 * prefix: /article
 * C.R.U.D
 */

/**
 * @param {Object{title, content}} req.body
 */
async function createArticle(req, res, next){
    const {title, content} = req.body;
    try{
        const article = await Article.createArticle({title, content});
        res.json(article);
    } catch (error){
        next(error);
    }
}

/**
 * 
 * @param {Object} req.qs 
 */

async function retrieveArticle(req, res, next){
    console.log(req.query)
    const {searchKwd, pageSize, pageNum} = req.query;
    
    try {
        const articles = await Article.find({
            title:{
                $regex: `.*${searchKwd || ''}.*` // 정규표현식
            }
        }, null, {
            limit: Number.parseInt(pageSize || 2),
            skip: ((Number.parseInt(pageSize || 2)) * 
                  (Number.parseInt(pageNum || 1) -1)), 
        });
        res.json(articles);
    } catch (error){
        next(error);
    }
}
/**
 * 
 * @param {Object{articleId}} req.params 
 */
async function retrieveOneArticle(req, res, next){
    const {articleId} = req.params;
    try{
        const article =  await Article.findById(articleId);
        res.json(article);
    } catch(err){
        next(err);
    }
} 

/**
 * 
 * @param {Object{title, content} req.body : 어떻게 바뀔건지?
 * @param {Object{articleId}} req.params : 어떤 걸 바꿀건지?
 */
async function updateArticle(req, res, next){
    const {articleId} = req.params;
    const {title, content} = req.body;
    try{
        const article = await Article.findByIdAndUpdate(articleId,{title,content})
        res.json(article);
    } catch(err){
        next(err);
    }
}
/**
 * Remove article by id
 * @param {Object{articleId}} req.params
 */
async function deleteArticle(req, res, next){
    const {articleId} = req.params;
    try {
        const result = await Article.findByIdAndRemove(articleId);
        res.json(result);
    } catch(err){
        next(err);
    }
}

/**
 * Add Comment of article 
 * POST     '/:articleId/comment'
 * @param {Object{articleId}} req.params
 * @param {Object{content}} req.body
 */
async function addComment(req, res, next){ 
    const {articleId} = req.params;
    const {content} = req.body;
    
    try{
        const article = await Article.findById(articleId);
        const comment = await article.addComment({content});
        res.json(comment);
    } catch(err){
        next(err);
    }
}