const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    preço: {
        type: String,
        require: true,
    },
    imagem: {
        type: String,
        require: true,
    },
    tipo: {
        type: String,
        require: true,
    },
    descriçao: {
        type: String,
        require: true,
    },
});

const Produto = mongoose.model("Produto", ProdutoSchema);

module.exports = Produto;