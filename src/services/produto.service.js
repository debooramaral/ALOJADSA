const Produto = require("../models/Produto");

const createProdutoService = (body) => Produto.create(body);

const findAllProdutosService = () => Produto.find();

module.exports = { createProdutoService, findAllProdutosService };