const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllUsersService = () => User.find();

module.exports = { createService, findAllUsersService };