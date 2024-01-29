const subcategory = require('../models/subcategory');
const category = require('../models/category');
const fs = require('fs');
const path = require('path')

module.exports.add_subcategory = async (req, res) => {
    let categoryData = await category.find({})
    return res.render('add_subcategory', {
        'categoryData': categoryData
    });
}

module.exports.add_subcategoryData = async (req, res) => {
    let imgPath = '';
    if (req.file) {
        imgPath = subcategory.subcategoryImagegPath + "/" + req.file.filename;
    }
    req.body.subcategoty_Image = imgPath;
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let subcategoryData = await subcategory.create(req.body);
    return res.redirect('back')
}


module.exports.view_subcategory = async (req, res) => {
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
       let totaladmindata = await subcategory.find({
        $or: [
             
            { "title": { $regex: ".*" + search + ".*", $options: "i" } },
            { "description": { $regex: ".*" + search + ".*", $options: "i" } },

        ]
       }).countDocuments();

       let data = await subcategory.find({
           $or: [
             
               { "title": { $regex: ".*" + search + ".*", $options: "i" } },
               { "description": { $regex: ".*" + search + ".*", $options: "i" } },
           ]
       })
         
           .limit(parpage)
           .skip(parpage * page).populate('category').exec();
   
        return res.render("view_subcategory",{
            subcatData: data,
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
            let activeData = await subcategory.findByIdAndUpdate(req.params.id, { isActive: false });

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
            let activeData = await subcategory.findByIdAndUpdate(req.params.id, { isActive: true });

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
module.exports.deletesubcetegory = async(req,res)=>{
    try{
        let oldData = await subcategory.findById(req.params.id);
        if(oldData)
        {
            var oldImage = oldData.subcategoty_Image;
            if(oldImage)
            {
                let FullPath = path.join(__dirname,"..",oldData.subcategoty_Image);
                await fs.unlinkSync(FullPath);
            }
        }
        else
        {
            console.log("Image Path is Worng");
            return res.redirect("back");
        }
        await subcategory.findByIdAndDelete(req.params.id);
        return res.redirect("back");
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.deleteAllsub = async(req,res)=>{
    await subcategory.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back')
}