// const registeredHomes = [];

const Home = require("../models/home");


exports.getAddHomes =(req,res,next)=>{
    // console.log(req.url, req.method);
    res.render('host/edit-home', {pageTitle:'Add Home to airbnb',editing:false});
}

exports.getEditHome =(req,res,next)=>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home => {
        if(!home){
            console.log("Home not found for editing.");
           return res.redirect("/host/host-home-list");
        }
        console.log(homeId, editing,home);
    res.render('host/edit-home', {
        home:home,
        pageTitle:'Edit Your Home ', editing:editing});

    })

}


exports.getHostHome=(req,res,next)=>{
    Home.fetchAll().then(registeredHomes=>{
        res.render('host/host-home-list',{registeredHomes: registeredHomes, pageTitle: 'Host Home List'})
});
   
}

exports.postAddHomes = (req,res,next)=>{

    const {houseName, price, location,rating,photoUrl,description} = req.body;
    const home = new Home(houseName, price, location,rating,photoUrl,description);
    home.save().then(()=>{
        console.log('Home Saved successfully');
    })
    res.redirect('/host/host-home-list')

}

exports.postEditHome = (req,res,next)=>{
    const {id,houseName, price, location,rating,photoUrl,description} = req.body;
    const home = new Home(houseName, price, location,rating,photoUrl,description,id);
    home.save().then(result=>{
        console.log('Home update ', result);
    });
    res.redirect('/host/host-home-list')

}

// exports.postEditHome = (req, res, next) => {
//     const { id, houseName, price, location, rating, photoUrl, description } = req.body;
//     const home = new Home(houseName, price, location, rating, photoUrl, description, id);
//     home.save();
//     res.redirect("/host/host-home-list");
// };


exports.postDeleteHome=(req,res,next)=>{
    const homeId = req.params.homeId;
    console.log("Came to delete ",homeId);
    Home.deleteById(homeId).then (()=>{
        res.redirect('/host/host-home-list')
    }).catch(error=>{
        console.log("Error While Deleting",error);
    });

}




// exports.registeredHomes = registeredHomes;
