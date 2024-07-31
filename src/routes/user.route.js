const route = require('express').Router();
const userController = require('../controllers/user.controller')

route.post("/", userController.create)
route.get("/", userController.findAllUsers);
route.get("/:cpf", userController.findById);
// route.get("/:cpf", userController.findOne);

module.exports = route;