const route = require('express').Router();
const produtoController = require('../controllers/produto.controller')

route.post("/", produtoController.createProduto);
route.get("/", produtoController.findAllProdutos);
route.get("/search", produtoController.searchByNome);
//Rotas com parametros, deixar separado, pois dá confusão na hora de saber qual 'get' usar
route.patch("/:nome", produtoController.update);
route.get("/:id", produtoController.findById); //manter . . 

module.exports = route;
