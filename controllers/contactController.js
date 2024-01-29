const contact = require('../models/contact')


module.exports.view_contact = async(req,res)=>{
    let contactDetais = await contact.find({});
    return res.render('view_contact',{
        contactData : contactDetais
    })
}

// de-active data
module.exports.setDeactive = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await contact.findByIdAndUpdate(req.params.id,{isActive : false});
        
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
            let activeData = await contact.findByIdAndUpdate(req.params.id,{isActive : true});

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

module.exports.deletecontact = async(req,res)=>{   
    await contact.findByIdAndDelete(req.params.id);
    return res.redirect("back");
}

module.exports.deleteAllcontact = async(req,res)=>{
    await contact.deleteMany({ _id: { $in: req.body.deleteall } });
    return res.redirect('back')
}