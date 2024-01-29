const express = require('express');
const routs = express.Router(); 
const contact = require('../models/contact');
const contactController = require('../controllers/contactController');

routs.get('/view_contact',contactController.view_contact);
routs.get('/setDeactive/:id',contactController.setDeactive);
routs.get('/setActive/:id',contactController.setActive);
routs.get('/deletecontact/:id',contactController.deletecontact);
routs.post('/deleteAllcontact',contactController.deleteAllcontact);
module.exports = routs;