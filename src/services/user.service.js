const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllUsersService = () => User.find();

const findUserByCPF = (cpf) => User.findOne({cpf});

module.exports = { createService, findAllUsersService, findUserByCPF };
