const mongoose = require('mongoose');
const subCategoryPath = '/uploades/subcategory';
const path = require('path')
const multer = require('multer');

const subcategorySchema = mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required : true
    },
    description : {
        type : String,
        required : true
    },
    subcategoty_Image : {
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

const subcategoryStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",subCategoryPath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})
subcategorySchema.statics.subcategoryUploadImage = multer({storage : subcategoryStorage}).single("subcategoty_Image");
subcategorySchema.statics.subcategoryImagegPath = subCategoryPath;

const subcategoryData = mongoose.model('subcategory',subcategorySchema);
module.exports = subcategoryData;