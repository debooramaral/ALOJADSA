const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllUsersService = () => User.find();

const findUserByCPF = (cpf) => User.findOne({ cpf });
const updateService = (
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
) => User.findOneAndUpdate({ cpf: cpf }, {
    nome,
    telefone,
    endereço,
    email,
    senha,
    formapagamento,
    numerocartao,
    nometitular,
    datavalidade,
    codigosegurança
}
)

module.exports = { createService, findAllUsersService, findUserByCPF, updateService };
