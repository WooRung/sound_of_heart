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
 * Model
 */
module.exports = mongoose.model('Article', Article);