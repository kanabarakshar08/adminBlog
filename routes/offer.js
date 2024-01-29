const express = require('express');
const routs = express.Router();
const offermodel=require('../models/offermodel')
const offercontroller = require('../controllers/offercontroller');



routs.get('/offer', async (req, res) => {
    return res.render('offer')
})
routs.post('/insertofferData',offercontroller.insertofferData);
routs.get('/view_offer',offercontroller.view_offer);
routs.get('/setDeactive/:id',offercontroller.setDeactive);
routs.get('/setActive/:id',offercontroller.setActive);
routs.get('/deleteoffer/:id',offercontroller.deleteoffer);
routs.post('/deleteAlloffer',offercontroller.deleteAlloffer);

module.exports = routs;
