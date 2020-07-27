const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const List = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    listName: {
        type: String,
        required: true
    },
    tasks: {
       type: Array
    }
});

module.exports = mongoose.model('List', List);