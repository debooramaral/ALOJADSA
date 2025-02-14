import { Router } from "express";
import { addToSacola, removeFromSacola, viewSacola } from "../controllers/sacola.controller.js";

const route = Router();

//Adicionar produto a sacola
route.post("/:cpf/sacola", addToSacola);

//Remover produto da sacola
route.delete("/:cpf/sacola", removeFromSacola);

//Visualizar sacola do usuário
route.get("/:cpf/sacola", viewSacola);

export default route;