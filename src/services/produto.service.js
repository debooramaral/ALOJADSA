const Produto = require("../models/Produto");

const createProdutoService = (body) => Produto.create(body);

const findAllProdutosService = () => Produto.find();

const findByIdService = (id) => Produto.findById(id);

module.exports = { createProdutoService, findAllProdutosService, findByIdService };