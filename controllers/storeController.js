// const registeredHomes = [];

const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(registeredHomes=>{
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
    })
  });
  
 
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(registeredHomes=>{
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Home List",
    })
});
};

exports.getBookings = (req, res, next) => {
    res.render("store/bookings", {
      // registeredHomes: registeredHomes,
      pageTitle: "Booking-Home",
    })
  // );
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes=>{
      console.log(favourites,registeredHomes);
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav.save().then(result=>{
    console.log("Fav added: ", result);
  }).catch(err=>{
    console.log("Error while marking favourite: ", err);
  }).finally(()=>{
    res.redirect("/favourites");
  })
  
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result=>{
    console.log("Fav Removed: ", result);
  }).catch(err=>{
    console.log("Error while removing favourite: ", err);
  }).finally(()=>{
    res.redirect("/favourites");
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then( home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    }
    //   console.log("home details Found", home);
    else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
      });
    }
  });
};

// exports.registeredHomes = registeredHomes;
