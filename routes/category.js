const express = require('express');
const routs = express.Router(); 
const category = require('../models/category');
const categoryController = require('../controllers/categoryController');

routs.get('/add_category', async(req,res)=>{
    return res.render('add_category')
})

routs.post('/add_category', categoryController.add_category);
routs.get('/view_category', categoryController.view_category);
routs.get("/setDeactive/:id", categoryController.setDeactive);
routs.get("/setActive/:id",categoryController.setActive);
routs.get('/deletecetegory/:id',categoryController.deletecetegory);
routs.post("/deleteAllcat",categoryController.deleteAllcat)

module.exports = routs; 