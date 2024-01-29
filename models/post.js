const mongoose = require('mongoose');
const postPath = '/uploades/post';
const path = require('path')
const multer = require('multer');

const postSchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    postImage : {
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

const postStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",postPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})
postSchema.statics.postUploadImage = multer({storage : postStorage}).single("postImage");
postSchema.statics.postImgPath = postPath;

const postData = mongoose.model('post',postSchema);
module.exports = postData;