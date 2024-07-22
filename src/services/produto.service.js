const Produto = require("../models/Produto");

const createProduto = (body) => Produto.create(body);

module.exports = {createProduto};