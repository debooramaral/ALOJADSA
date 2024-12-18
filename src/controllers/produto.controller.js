const produtoService = require('../services/produto.service');
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

//Buscar Produto por nome
const getProdutoByNome = async (req, res) => {
    const nomeP = req.params.nomeP;

    // Verificar se o nome é uma string válida
    if (!nomeP || typeof nomeP !== 'string' || nomeP.trim() === '') {
        return res.status(400).send({ message: "Nome inválido" });
    }

    // Verificar se o nome já existe no banco de dados
    try {
        // Verificar se o produto já existe no banco de dados
        const produto = await produtoService.findProdutoByNome({ nome: nomeP.trim() });

        if (produto) {
            return res.status(400).send({ message: "Este Produto já esta Cadastrado" });
        }

        // Caso o produto não exista
        return res.status(400).send({message: "Produto não encontrado no banco de dados"})
        
    } catch (error) {
        return res.status(500).send({ message: "Erro ao verificar o nome", error });
    }
};


module.exports = { createProduto, findAllProdutos, findById, getProdutoByNome }