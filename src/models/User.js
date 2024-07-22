const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true,
        unique: true,
    },
    telefone: {
        type: String,
        require: true,
    },
    endereço: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
    },
    formapagamento: {
        type: String,
        require: true,
    },
    numerocartao: {
        type: String,
        require: true,
    },
    nometitular: {
        type: String,
        require: true,
    },
    datavalidade: {
        type: String,
        require: true,
    },
    codigosegurança: {
        type: String,
        require: true,
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;