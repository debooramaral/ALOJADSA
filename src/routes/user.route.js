import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js";

const route = Router()

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
// route.get("/:id", validId, validUser, userController.findById); //feito para Middleware
route.get("/:cpf", userController.getUserByCPF);
route.patch("/:cpf", userController.update);

export default route;