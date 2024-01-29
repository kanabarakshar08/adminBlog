const mongoose = require('mongoose');
const commentPath = '/uploades/comment';
const path = require('path')
const multer = require('multer');

const commentSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required : true  
    },
    userImage : {
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

const commentStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",commentPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})
commentSchema.statics.commentUploadImage = multer({storage : commentStorage}).single("userImage");
commentSchema.statics.commentImagegPath = commentPath;

const commentData = mongoose.model('comment',commentSchema);
module.exports = commentData;