const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */
const Comment = new Schema({
    content: {
        type: String,
        required: true,
        validate: [(content)=>(content.length>0), 'comment must be written!']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

/**
 * Model
 */
module.exports = mongoose.model('Comment', Comment)