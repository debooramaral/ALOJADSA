const route = require('express').Router();
const produtoController = require('../controllers/produto.controller')

route.post("/", produtoController.createProduto);
route.get("/", produtoController.findAllProdutos);

route.get("/search", produtoController.searchByNome); 

route.get("/:id", produtoController.findById); //manter . . 

module.exports = route;
