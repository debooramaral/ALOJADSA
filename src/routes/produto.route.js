import express from "express";
import produtoController from '../controllers/produto.controller.js';

const route = express.Router()

route.post("/", produtoController.createProduto);
route.get("/", produtoController.findAllProdutos);
route.get("/search", produtoController.searchByNome);
//Rotas com parametros, deixar separado, pois dá confusão na hora de saber qual 'get' usar
route.patch("/:nome", produtoController.update);
route.get("/:id", produtoController.findById); //manter . . 

export default route;
