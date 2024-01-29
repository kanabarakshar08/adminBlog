const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const admin =require("../models/admin");


passport.use(new GoogleStrategy({
    clientID: "471022432055-6oed4o3uc27ha6k5js8qt1p4dsaetu54.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8010/admin/google/callback"
  },
  
  async function(accessToken, refreshToken, profile, cb) {
    // console.log(profile.emails[0].value);
    let checkemail = await admin.findOne({email:profile.emails[0].value});
    // console.log(checkemail)
        if(checkemail){
            return cb(null,checkemail)
        }
        else{
            let admindetils ={
                name:profile.displayName,
                email:profile.emails[0].value,
                password: "12345"
        }
        let adminrecord = await admin.create(admindetils)
        if(adminrecord){
            return cb(null,adminrecord)
        }
        else{
            return cb(null,false)
        }
    }
  }
));


module.exports=passport