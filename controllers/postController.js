const post = require('../models/post')
const fs = require('fs');
const path = require('path')

module.exports.add_posts = async (req, res) => {
    return res.render('add_post');
}

module.exports.insertpostData = async (req, res) => {
    let imgPath = '';
    if(req.file){
        imgPath = post.postImgPath+"/"+req.file.filename;
    }
    req.body.postImage = imgPath;
    req.body.isActive = true;
    req.body.username = req.user.name;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let postData = await post.create(req.body);
    return res.redirect('back')
}

module.exports.view_posts = async (req, res) => {
    try{
 
        let search = '';
        if(req.query.search){
            search= req.query.search;
        }
        
       if (req.query.page)
       {
           page = req.query.page;
       }
       else
       {
           page = 0;
       }
       
       var parpage = 2;
       let totaladmindata = await post.find({
        $or: [
             
            { "title": { $regex: ".*" + search + ".*", $options: "i" } },
            { "description": { $regex: ".*" + search + ".*", $options: "i" } },
            { "category": { $regex: ".*" + search + ".*", $options: "i" } },

        ]
       }).countDocuments();

       let data = await post.find({
           $or: [
             
               { "title": { $regex: ".*" + search + ".*", $options: "i" } },
               { "description": { $regex: ".*" + search + ".*", $options: "i" } },
               { "category": { $regex: ".*" + search + ".*", $options: "i" } },
           ]
       })
         
           .limit(parpage)
           .skip(parpage * page)
   
        return res.render("view_post",{
            postData: data,
            search : search,
            cpage : page,
            totaldoc: Math.ceil(totaladmindata / parpage)
        });
   }
   catch(err)
   {
        console.log(err);
        return res.redirect("back");
   }
}


// de-active data
module.exports.setDeactive = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await post.findByIdAndUpdate(req.params.id, { isActive: false });

            if (activeData) {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
            else {
                console.log("Data is Active");
                return res.redirect("back");
            }
        }
        else {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}


// active data
module.exports.setActive = async (req, res) => {
    try {
        if (req.params.id) {
            let activeData = await post.findByIdAndUpdate(req.params.id, { isActive: true });

            if (activeData) {
                console.log("Data is Active");
                return res.redirect("back");
            }
            else {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
        }
        else {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("back");
    }
}


// delete
module.exports.deletepost = async(req,res)=>{
    try{
        let oldData = await post.findById(req.params.id);
        if(oldData)
        {
            var oldImage = oldData.postImage;
            if(oldImage)
            {
                let FullPath = path.join(__dirname,"..",oldData.postImage);
                await fs.unlinkSync(FullPath);
            }
        }
        else
        {
            console.log("Image Path is Worng");
            return res.redirect("back");
        }
        await post.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.deleteAllpost = async(req,res)=>{
    await post.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back')
}