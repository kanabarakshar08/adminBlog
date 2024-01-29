const offermodel = require('../models/offermodel');
const path = require('path');

module.exports.insertofferData = async (req, res) => {
    // console.log(req.body);
 
            req.body.isActive = true;
            req.body.currentDate = new Date().toLocaleString();
            req.body.updateDate = new Date().toLocaleString();
            const offerdata = await offermodel.create(req.body)
    

return res.redirect('back');
}


module.exports.view_offer = async (req, res) => {
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
        let totaladmindata = await offermodel.find({
         $or: [
              
             { "Heading": { $regex: ".*" + search + ".*", $options: "i" } },
             { "title": { $regex: ".*" + search + ".*", $options: "i" } },
             { "discription": { $regex: ".*" + search + ".*", $options: "i" } }
         ]
        }).countDocuments();
 
        let data = await offermodel.find({
            $or: [
              
                { "Heading": { $regex: ".*" + search + ".*", $options: "i" } },
                { "title": { $regex: ".*" + search + ".*", $options: "i" } },
                { "discription": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        })
          
            .limit(parpage)
            .skip(parpage * page);
    
        
         return res.render("view_offer",{
             offerData: data,
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
            let activeData = await offermodel.findByIdAndUpdate(req.params.id,{isActive : false});
        
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
            let activeData = await offermodel.findByIdAndUpdate(req.params.id,{isActive : true});

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


module.exports.deleteoffer = async(req,res)=>{
    await offermodel.findByIdAndDelete(req.params.id);
    return res.redirect("back");
}

module.exports.deleteAlloffer = async(req,res)=>{
    await offermodel.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back')
}