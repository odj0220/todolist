'use strict';

var mongoose = require('mongoose');
var autoincrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var TodoSchema = new mongoose.Schema({
    sec: Number,
    description: String,
    priority: {
        type: String,
        enum: ['high', 'middle', 'low'],
        default: 'middle'
    },
    status: {
        type: String,
        enum: ['inprogress', 'close'],
        default: 'inprogress'
    },
    created: {
        type: Date,
        default: new Date()
    }
}, {collection: 'list'});



// Export the model
TodoSchema.plugin(autoincrement, {inc_field: 'sec'});
module.exports = mongoose.model('Todo', TodoSchema);