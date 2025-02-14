import { Router } from "express";
import { addToSacola, removeFromSacola, viewSacola } from "../controllers/sacola.controller.js";

const route = Router();

//Adicionar produto a sacola
route.post("/sacola/:cpf", addToSacola);

//Remover produto da sacola
route.delete("/sacola/:cpf", removeFromSacola);

//Visualizar sacola do usuário
route.get("/sacola/:cpf", viewSacola);

export default route;