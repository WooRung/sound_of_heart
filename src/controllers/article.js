const Article = require('../models/article');

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
async function retrieveArticle(req, res, next){}
async function retrieveOneArticle(req, res, next){} 
async function updateArticle(req, res, next){}
async function deleteArticle(req, res, next){}

module.exports = {
    createArticle,retrieveArticle, retrieveOneArticle, 
    updateArticle, deleteArticle
}