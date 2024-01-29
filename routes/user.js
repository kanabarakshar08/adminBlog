const express = require('express');
const routs = express.Router();

const userController = require('../controllers/userController');
const comment = require('../models/comment');

routs.get('/',userController.home);
routs.get('/blog_single/:id',userController.blog_single);
routs.post('/addComment',comment.commentUploadImage,userController.addComment);
routs.get('/category',userController.category);
routs.get('/contact',userController.contact);
routs.get('/contact',userController.contact);
routs.post('/addContact',userController.addContact);


module.exports = routs;