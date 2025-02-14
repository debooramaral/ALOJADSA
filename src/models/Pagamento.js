import mongoose from "mongoose";
import Produto from "./Produto.js";
import User from "./User.js";

const PagamentoSchema = new mongoose.Schema({ //Relacionamento de tabelas
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    produtos: [
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Produto"
            },
            quantidade:{ 
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pendente", "Pago", "Cancelado"],
        default: "Pendente"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Pagamento = mongoose.model("Pagamento", PagamentoSchema);

export default Pagamento;