const express = require('express');
const routs = express.Router(); 
const post = require('../models/post');
const postController = require('../controllers/postController');

routs.get('/add_posts', async(req,res)=>{
    return res.render('add_post')
})

routs.post('/insertpostData', post.postUploadImage,postController.insertpostData);
routs.get('/view_posts',postController.view_posts);
routs.get('/setDeactive/:id',postController.setDeactive);
routs.get('/setActive/:id',postController.setActive);
routs.get('/deletepost/:id',postController.deletepost);
routs.post('/deleteAllpost',postController.deleteAllpost);

module.exports = routs; 