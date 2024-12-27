
// External module
const express = require('express')
const hostRouter = express.Router();

// local module
const hostController = require("../controllers/hostController")


// using controller
hostRouter.get("/add-home",hostController.getAddHomes)
hostRouter.post("/add-home",hostController.postAddHomes)
hostRouter.get("/host-home-list",hostController.getHostHome)
hostRouter.get("/edit-home/:homeId",hostController.getEditHome)
hostRouter.post("/edit-home",hostController.postEditHome)
hostRouter.post("/delete-home/:homeId",hostController.postDeleteHome)

exports.hostRouter = hostRouter;
