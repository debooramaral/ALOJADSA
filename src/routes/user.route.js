import {Router} from 'express';
import userController from '../controllers/user.controller.js'

const route = Router()

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:cpf", userController.getUserByCPF);
route.patch("/:cpf", userController.update);

export default route;