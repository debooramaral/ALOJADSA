const route = require('express').Router();
const userController = require('../controllers/user.controller.js');

const {validId, validUser} = require("../middlewares/global.middlewares.js");

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
// route.get("/:id", validId, validUser, userController.findById); //feito para Middleware
route.get("/:cpf", userController.getUserByCPF);
route.patch("/:cpf", userController.update);

module.exports = route;