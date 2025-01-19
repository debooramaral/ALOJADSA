const { collection } = require('../models/Produto.js');
const produtoService = require('../services/produto.service.js');
const mongoose = require("mongoose");

const createProduto = async (req, res) => {
    const camposObrigatoriosP = [
        'nome', 'preço', 'imagem', 'tipo', 'descriçao'
    ];

    //verifica se todos os campos obrigatorios estão presentes

    const camposFaltandoP = camposObrigatoriosP.filter(campo => !req.body[campo]);

    if (camposFaltandoP.length > 0) {
        return res.status(400).send({
            message: `Preencha todos os campos para cadastrar produtos. Falta: ${camposFaltandoP.join(', ')}`
        });
    }

    const produto = await produtoService.createProdutoService(req.body);

    if (!produto) {
        return res.status(400).send({ message: "Erro na criação do produto" })
    }

    res.status(201).send({
        message: "Produto criado com sucesso ",
        produto: {
            id: produto._id,
            nome: req.body.nome,
            preço: req.body.preço,
            imagem: req.body.imagem,
            tipo: req.body.tipo,
            descriçao: req.body.descriçao,
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

//Manter..
const findById = async (req, res) => {
    const id = req.params.id

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).send({ message: "ID Inválido" })
    // }

    const produto = await produtoService.findByIdService(id)

    if (!produto) {
        return res.status(400).send({ message: "Produto não encontrado" })
    }

    res.send(produto)
};

//Aula 24
const searchByNome = async (req, res) => {
    try {
        const { nome } = req.query;
        
        const produto = await produtoService.searchByNomeService(nome);
        
        if (produto.length === 0) {
            return res.status(400).send({ message: "Não existe produto com este nome" });
        }

        return res.send({
            results: produto.map((item) =>({
                id: item._id,
                nome: item.nome,
                preço: item.preço,
                imagem: item.imagem,
                tipo: item.tipo,
                descriçao: item.descrição,
            })),
        });

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

module.exports = { createProduto, findAllProdutos, findById, searchByNome }
