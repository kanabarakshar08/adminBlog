const express = require('express');
const routs = express.Router(); 
const comment = require('../models/comment');
const commentController = require('../controllers/commentController');

routs.get('/view_comment',commentController.view_comment);
routs.get('/setDeactive/:id',commentController.setDeactive);
routs.get('/setActive/:id',commentController.setActive);
routs.get('/deletecomment/:id',commentController.deletecomment);
routs.post('/deleteAllcomment',commentController.deleteAllcomment);
module.exports = routs;