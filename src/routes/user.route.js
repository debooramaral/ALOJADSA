const route = require('express').Router();
const userController = require('../controllers/user.controller')

route.post("/", userController.create)
route.get("/", userController.findAllUsers);
route.get("/:cpf", userController.findById);


module.exports = route;