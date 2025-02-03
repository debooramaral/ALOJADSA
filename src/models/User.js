import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
        unique: true,
    },
    senha: {
        type: String,
        require: true,
        select: false,
    },
    formapagamento: {
        type: String,
        require: true,
    },
    numerocartao: {
        type: String,
        require: true,
        select: false,
    },
    nometitular: {
        type: String,
        require: true,
    },
    datavalidade: {
        type: String,
        require: true,
        select: false,
    },
    codigosegurança: {
        type: String,
        require: true,
        select: false,
    },
});

UserSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
})

UserSchema.pre("save", async function (next) {
    this.codigosegurança = await bcrypt.hash(this.codigosegurança, 5);
    next();
})

const User = mongoose.model("User", UserSchema);

export default User;