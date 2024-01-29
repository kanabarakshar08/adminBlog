const express = require('express');
const routs = express.Router(); 
const subcategory = require('../models/subcategory');
const subcategoryController = require('../controllers/subcategoryController');

routs.get('/add_subcategory',subcategoryController.add_subcategory)
routs.post('/add_subcategoryData',subcategory.subcategoryUploadImage ,subcategoryController.add_subcategoryData);
routs.get('/view_subcategory',subcategoryController.view_subcategory);
routs.get("/setDeactive/:id", subcategoryController.setDeactive);
routs.get("/setActive/:id",subcategoryController.setActive);
routs.get("/deletesubcetegory/:id",subcategoryController.deletesubcetegory);
routs.post("/deleteAllsub",subcategoryController.deleteAllsub)
module.exports = routs; 