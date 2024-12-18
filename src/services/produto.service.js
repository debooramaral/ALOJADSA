const Produto = require("../models/Produto");

const createProdutoService = (body) => Produto.create(body);

const findAllProdutosService = () => Produto.find();

// const findProdutoByNome = (nome) => Produto.findOne({ nome });

const findProdutoByNome = async (filter) => {
    return await Produto.findOne(filter);}; // Busca por "nome", especificado no filtro

const findByIdService = (id) => Produto.findById(id);

module.exports = { createProdutoService, findAllProdutosService, findProdutoByNome, findByIdService };