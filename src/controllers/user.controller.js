const userService = require('../services/user.service');

const create = async (req, res) => {
    const { nome, cpf, telefone, endereço, email, senha, formapagamento, numerocartao, nometitular, datavalidade, codigosegurança } = req.body;

    if (!nome, !cpf, !telefone, !endereço, !email, !senha, !formapagamento, !numerocartao, !nometitular, !datavalidade, !codigosegurança) {
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

module.exports = { create, findAllUsers };