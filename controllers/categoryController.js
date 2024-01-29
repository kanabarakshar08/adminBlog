const category = require('../models/category');


module.exports.add_category = async (req, res) => {
    req.body.isActive = true;
    req.body.created_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();
    let categoryData = await category.create(req.body);
    return res.redirect('back')
}


module.exports.view_category = async (req, res) => {
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
        let totaladmindata = await category.find({
         $or: [
              
             { "name": { $regex: ".*" + search + ".*", $options: "i" } },
             { "email": { $regex: ".*" + search + ".*", $options: "i" } },
             { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
         ]
        }).countDocuments();
 
        let data = await category.find({
            $or: [
              
                { "name": { $regex: ".*" + search + ".*", $options: "i" } },
                { "email": { $regex: ".*" + search + ".*", $options: "i" } },
                { "gender": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
          
            .limit(parpage)
            .skip(parpage * page);
    
        
         return res.render("view_category",{
             adminData: data,
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
module.exports.setDeactive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await category.findByIdAndUpdate(req.params.id,{isActive : false});
        
            if(activeData)
            {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
            else{
                console.log("Data is Active");
                return res.redirect("back");
            }
        }
        else
        {
             console.log("Params is Not Found!!!");
             return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


// active data
module.exports.setActive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await category.findByIdAndUpdate(req.params.id,{isActive : true});

            if(activeData)
            {
                console.log("Data is Active");
                return res.redirect("back");
            }
            else{
                console.log("Data is Deactive");
                return res.redirect("back");
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.deletecetegory = async(req,res)=>{
    await category.findByIdAndDelete(req.params.id);
    return res.redirect("back");
}

module.exports.deleteAllcat = async(req,res)=>{
    await category.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back')
}