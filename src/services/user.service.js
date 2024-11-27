const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllUsersService = () => User.find();

const findUserByCPF = (cpf) => User.findOne({ cpf });

const updateServiceB = async (cpf, camposParaAtualizar) => {
    await User.findOneAndUpdate(
        { cpf }, // Filtra pelo CPF
        { $set: camposParaAtualizar }, // Atualiza apenas os campos enviados
        { new: true } // Retorna o documento atualizado
    );
};


module.exports = { createService, findAllUsersService, findUserByCPF, updateServiceB };
