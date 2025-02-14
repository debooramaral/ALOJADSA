import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import Produto from "./Produto.js";

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    endereço: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    formapagamento: {
        type: String,
        required: true,
    },
    numerocartao: {
        type: String,
        required: true,
        select: false,
    },
    nometitular: {
        type: String,
        required: true,
    },
    datavalidade: {
        type: String,
        required: true,
        select: false,
    },
    codigosegurança: {
        type: String,
        required: true,
        select: false,
    },
    sacola: [
        {
            produto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Produto",
                required: true
            },
            quantidade: {
                type: Number,
                default: 1,
                require: true
            }
        }
    ]
});

//Middleware para hash de senha e codigo de segurança
UserSchema.pre("save", async function (next) {
    if (this.isModified("senha")) {
        this.senha = await bcrypt.hash(this.senha, 10);
    }
    if (this.isModified("codigosegurança")) {
        this.codigosegurança = await bcrypt.hash(this.codigosegurança, 5);
    }

    next();
})

//Virtual para mascarar o número do cartão e data de validade
UserSchema.virtual("numerocartaoMascarado").get(function () {
    if (!this.numerocartao) return "";
    return this.numerocartao.replace(/\d(?=\d{4})/g, "*") //Mnatem apenas os ultimos 4 digitos
});

UserSchema.virtual("datavalidadeMascarada").get(function (){
    if(!this.datavalidade) return "";
    return this.datavalidade.replace(/./g, "*"); //Substitua todos os caracteres por "*"
});

//Confirgura a conversão de JSON para incluir os campos mascarados
UserSchema.set("toJSON", {virtuals: true});
UserSchema.set("toObject", {virtuals: true});

const User = mongoose.model("User", UserSchema);

export default User;