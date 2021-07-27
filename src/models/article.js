const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema
 */
const Article = new Schema({
    title: {
        type: String,
        required: true,
        validate: [{
            validator: function(title){
                if (title.length < 3){
                    return false;
                }
                return true;
            },
            message: function(props){
                return `${props.path} field is too short. got, ${props.value}`
            }
        }]
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
/**
 * Virtuals: 실제 존재하지 않는 field(key)를 Handling(get, set)할 수 있게 해줌.
 */
Article.virtual('short_title').get(function(){
    return this.makeShort(this.title);
})

/**
 * Methods: Instance단위(Document 1개)로 실행되는 함수. 
 */
Article.methods = {
    makeShort: function(title){
        return title.slice(0, 10);
    },
    // makeShort2: (title)=>{
    //     console.log(this);
    //     return title.slice(0,10)
    // }
}

 /**
  * Statics: Schema단위로 실행되는 함수.
  */
Article.statics = {
    createArticle: async function({title, content}){
        // 방법1. create (callback)
        // const article = Article.create({title, content}, (article)=>{
        //     console.log(article)
        // })
        const article = await this.create({title, content});
        return article;
    }
}


/**
 * Model
 */
module.exports = mongoose.model('Article', Article);