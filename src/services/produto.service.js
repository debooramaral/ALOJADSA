const Produto = require("../models/Produto.js");

const createProdutoService = (body) => Produto.create(body);

const findAllProdutosService = () => Produto.find();

const findByIdService = (id) => Produto.findById(id);

const searchByNomeService = (nome) => Produto.find({
    nome: { $regex: `${nome || ""}`, $options: "i" }
})


module.exports = { createProdutoService, findAllProdutosService, findByIdService, searchByNomeService };