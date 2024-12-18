const route = require('express').Router();
const produtoController = require('../controllers/produto.controller')

route.post("/", produtoController.createProduto)
route.get("/", produtoController.findAllProdutos);
route.get("/:id", produtoController.findById); //manter . . 
route.get("/:nome", produtoController.getProdutoByNome);

module.exports = route;