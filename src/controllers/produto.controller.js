const produtoService = require('../services/produto.service');
const mongoose = require("mongoose");

const createProduto = async (req, res) => {
    const { nome, preço, imagem, tipo, descriçao } = req.body;

    if (!nome, !preço, !imagem, !tipo, !descriçao) {
        res.status(400).send({ message: "Preencha todos os campos para cadastrar produtos" })
    }

    const produto = await produtoService.createProdutoService(req.body);

    if (!produto) {
        return res.status(400).send({ message: "Erro na criação do produto" })
    }

    res.status(201).send({
        message: "Produto criado com sucesso ",
        produto: {
            id: produto._id,
            nome,
            preço,
            imagem,
            tipo,
            descriçao,
        },
    });
}

const findAllProdutos = async (req, res) => {
    const produtos = await produtoService.findAllProdutosService();

    if (produtos.length === 0) {
        return res.status(400).send({ message: "Não há produtos cadastrados" })
    }

    res.send(produtos)
};

const findById = async (req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: "ID Inválido" })
    }

    const produto = await produtoService.findByIdService(id)

    if (!produto) {
        return res.status(400).send({ message: "Produto não encontrado" })
    }

    res.send(produto)
};

module.exports = { createProduto, findAllProdutos, findById }