const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllUsersService = () => User.find();

const findByIdService = (cpf) => User.findById(cpf);

// const findByOneService = (cpf) => User.findOne(cpf);

module.exports = { createService, findAllUsersService, findByIdService };

// findByIdService, findByOneService