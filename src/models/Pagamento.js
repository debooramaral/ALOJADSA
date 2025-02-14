import mongoose from "mongoose";

const PagamentoSchema = new mongoose.Schema({ //Relacionamento de tabelas
    nomeProduto: {
        type: String,
        require: true
    },
    serviço: {
        type: Array,
        require: true
    },
    produto: {
        type: mongoose.Schema.Types.String, //Utilizar o NOME de produto
        ref: "Produto",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.String, //Utilizar o CPF de usuário
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const Pagamento = mongoose.model("Pagamento", PagamentoSchema);

export default Pagamento;