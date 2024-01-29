const express = require('express');
const routes = express.Router();
const adminController = require("../controllers/adminController");
const Admin = require("../models/admin");
const passport = require('passport');

routes.get("/",async (req,res)=>{
    if(req.cookies.adminName)
    {
        return res.redirect("/admin/deshboard");
    }
    return res.render('login');
});
routes.get("/failureRedirect",async(req,res)=>{
    req.flash("error","invalid email or password");
    res.redirect("/admin/")
})
routes.get("/deshboard",passport.checkAuth,adminController.deshboard);
routes.get("/add_admin",passport.checkAuth,adminController.add_admin);
routes.post("/addAdminData",Admin.uploadAdminImage,passport.checkAuth, adminController.addAdminData );
routes.get("/view_admin",passport.checkAuth,adminController.view_admin);
routes.get("/setDeactive/:id",passport.checkAuth,adminController.setDeactive);
routes.get("/setActive/:id",passport.checkAuth,adminController.setActive);
routes.get("/deleteAdminData/:id",passport.checkAuth,adminController.deleteAdminData);
routes.get("/updateAdminData/:id",passport.checkAuth,adminController.updateAdminData);
routes.post("/EditAdminData",passport.checkAuth,Admin.uploadAdminImage,adminController.EditAdminData);
routes.post("/checklogin",passport.authenticate('local',{failureRedirect:"/admin/failureRedirect"}),adminController.checklogin);
routes.get("/changepassword",passport.checkAuth,adminController.changepassword);
routes.post("/modifypass",passport.checkAuth,adminController.modifypass);
routes.get("/profile",passport.checkAuth,adminController.profile);
routes.get("/updateProfile",passport.checkAuth,adminController.updateProfile);

routes.post("/deleteAll", passport.checkAuth, adminController.deleteAll);

routes.get("/logout",async (req,res)=>{
    res.clearCookie("adminName");
    return res.redirect("/admin");
});  

// forget pass 

 routes.get("/mailpage",async(req,res)=>{
       return res.render("forgetpass/mailpage")
 })

 routes.post("/checkmail",adminController.checkmail);

 routes.get("/otppage",async(req,res)=>{
      return res.render("forgetpass/otppage");
 })
 routes.post("/checkotp",adminController.checkotp);
 routes.get("/resetPass",async(req,res)=>{
    return res.render("forgetpass/resetPass");
})
routes.post("/verifyPass",adminController.verifyPass);

//login with google
routes.get('/google',passport.authenticate('google', { scope: ['profile','email'] }));
routes.get('/google/callback',passport.authenticate('google', { failureRedirect: '/admin/login' }),adminController.checklogin);
//  user

routes.use('/slider', passport.checkAuth, require('./slider'));
routes.use('/post', passport.checkAuth, require('./post'));
routes.use('/comment',passport.checkAuth, require('./comment'));
routes.use('/category',passport.checkAuth, require('./category'));
routes.use('/subcategory', passport.checkAuth, require('./subcategory'));
routes.use('/offer', passport.checkAuth, require('./offer'));
routes.use('/contact', passport.checkAuth, require('./contact'));



module.exports =routes;