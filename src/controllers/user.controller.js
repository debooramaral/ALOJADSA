const userService = require('../services/user.service');
const mongoose = require("mongoose");

const isValidCPF = require("../utils/validateCpf")

const create = async (req, res) => {
    const { nome, cpf, telefone, endereço, email, senha, formapagamento, numerocartao, nometitular, datavalidade, codigosegurança } = req.body;

    if (!nome || !cpf || !telefone || !endereço || !email || !senha || !formapagamento || !numerocartao || !nometitular || !datavalidade || !codigosegurança) {
        res.status(400).send({ message: "Preencha todos os campos para cadastro de usuário" })
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: "Erro na criação do usuário" });
    }

    res.status(201).send({
        message: "Usuário criado com sucesso",
        user: {
            id: user._id,
            nome,
            cpf,
            telefone,
            endereço,
            email,
            formapagamento,
            numerocartao,
            nometitular,
            datavalidade,
            codigosegurança,
        },
    });
};

const findAllUsers = async (req, res) => {
    const users = await userService.findAllUsersService();

    if (users.length === 0) {
        return res.status(400).send({ message: "Não há usuários cadastrados" })
    }

    res.send(users)
};

const getUserByCPF = async (req, res) => { //função adicionada a portir do chatgpt
    const cpf = req.params.cpf;

    // Ainda imaginando a melhor regra para uma validação de CPF. 
    // Colocar algo mais simples, apenas verificação dentro do sistema deste dado

    const user = await userService.findUserByCPF(cpf);

    if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" })
    }

    res.send(user)
};

const update = async (req, res) => {
    let { nome, cpf, telefone, endereço, email, senha, formapagamento, numerocartao, nometitular, datavalidade, codigosegurança } = req.body;

    if (!nome && !cpf && !telefone && !endereço && !email && !senha && !formapagamento && !numerocartao && !nometitular && !datavalidade && !codigosegurança) {
        res.status(400).send({ message: "Envie pelo menos um campo para atualização" })
    }
    
    // não esta caindo na verificação acima ??? e sim direto na "atualização com sucesso"

    cpf = req.params.cpf;

    const user = await userService.findUserByCPF(cpf);

    if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" })
    }

    await userService.updateService(
        nome,
        cpf,
        telefone,
        endereço,
        email,
        senha,
        formapagamento,
        numerocartao,
        nometitular,
        datavalidade,
        codigosegurança
    );

    res.send({ message: "Usuário atualizado com sucesso" })

};

module.exports = { create, findAllUsers, getUserByCPF, update };

