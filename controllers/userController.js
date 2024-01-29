const slider = require('../models/slider');
const post = require('../models/post');
const comment = require('../models/comment');
const category = require('../models/category');
const subcategory = require('../models/subcategory');
const offermodel = require('../models/offermodel');
const contact = require('../models/contact');
const nodemailer = require("nodemailer");

module.exports.home = async(req,res)=>{
    let sliderData = await slider.find({isActive: true})
    let postDetails = await post.find({ isActive: true })
    let offerdata = await offermodel.find({isActive: true});
    return res.render('userpanel/home',{
        'sliderData': sliderData,
        'postDetails': postDetails,
        offerview: offerdata
    });
}

module.exports.blog_single = async(req,res)=>{
    // recent post
    let RecentPost = await post.find({}).sort({'_id' : -1}).limit(3);

    // next post
    let Allpost = await post.find({});
    let ids = [];
    Allpost.map((v,i)=>{
        ids.push(v.id);
    })
   
    var next;
    for(var i=0; i<ids.length; i++)
    {
        if(ids[i] === req.params.id){
            next = i;
            break;
        }
    }

    // comment Data
    let blogID = req.params.id;
    let blogData = await post.findOne({_id: blogID});
    let commentData = await comment.find({postId:blogID,isActive:true});
    return res.render('userpanel/blog_single',{
        'blogData':blogData,
        'commentData':commentData,
        'AllIds':ids,
        'cp':next,
        'RecentPost':RecentPost
    })
}


module.exports.addComment = async(req,res)=>{
    let imgPath = '';
    if(req.file){
        imgPath = comment.commentImagegPath+"/"+req.file.filename;
    }
    req.body.userImage = imgPath;
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    await comment.create(req.body);
    return res.redirect('back')
}


// category
module.exports.category = async(req,res)=>{
    let categoryData = await category.find({isActive:true});
    let subcategoryData = await subcategory.find({isActive:true});
    return res.render('userpanel/category',{
        'categoryData':categoryData,
        'subcategoryData':subcategoryData
    });
}

module.exports.contact = async (req, res) => {
    return res.render('userpanel/contact')
}

module.exports.addContact = async (req, res) => {
   console.log(req.body);
}


module.exports.addContact = async (req, res) => {

    try{
        var em = true
         if(em){
             const transporter = nodemailer.createTransport({
                 host: "smtp.gmail.com",
                 port: 465,
                 secure: true,
                 auth: {
                   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                   user: "kanabarakshar08@gmail.com",
                   pass: "mwxgfgzopzadnjpo",
                 },
               });
               
               let username = req.body.name
               const info = await transporter.sendMail({
                 from: 'kanabarakshar08@gmail.com', // sender address
                 to: req.body.email, // list of receivers
                 subject: "Thank You", // Subject line
                 text: "Hello world?", // plain text body
                 html: `<td class="esd-stripe" align="center">
                 <table class="es-content-body" style="width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                     <tbody>
                         <tr>
                             <td class="esd-structure es-p40" align="left">
                                 <table cellpadding="0" cellspacing="0" width="100%">
                                     <tbody>
                                         <tr>
                                             <td width="520" class="esd-container-frame" align="center" valign="top">
                                                 <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fef852" style="background-color: #f2bc46; border-radius: 20px; border-collapse: separate;">
                                                     <tbody>
                                                         <tr>
                                                             <td align="center" class="esd-block-text es-p30t es-p10b es-p20r es-p20l">
                                                                 <h1>!!Thank You!!<br>Visit Again</h1>
                                                             </td>
                                                             <td>
                                                                <h3>Dear ${username},</h3>
                                                                <p><br></p>
                                                                <p>Thank you for visit our website.<br></p>
                                                                <p>Best regards,<br><h6>coding master</h6></p>
                                                             </td>
                                                         </tr>
                                                     </tbody>
                                                 </table>
                                             </td>
                                         </tr>
                                     </tbody>
                                 </table>
                             </td>
                         </tr>
                     </tbody>
                 </table>
             </td>`, // html body
               });
         }
   }
    catch(err){
          console.log("somthing wrong",err)
           return res.redirect("back")
    }

    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let contactData = await contact.create(req.body);
    return res.redirect('back')
}