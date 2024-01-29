const mongoose = require('mongoose');
const path = require('path')


const categorySchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    },
    created_date : {
        type : String,
        required : true
    },
    updated_date : {
        type : String,
        required : true
    }
})


const categoryData = mongoose.model('category',categorySchema);
module.exports = categoryData;