const create = (req, res) => {
    const { nome, cpf, telefone, endereço, email, senha, formapagamento, numerocartao, nometitular, datavalidade, codigosegurança } = req.body;

    if (!nome, !cpf, !telefone, !endereço, !email, !senha, !formapagamento, !numerocartao, !nometitular, !datavalidade, !codigosegurança) {
        res.status(400).send({ message: "Preencha todos os campos para cadastro de usuário" })
    }

    res.status(201).send({
        message: "Usuário criado com sucesso",
        user: {
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

module.exports = { create };