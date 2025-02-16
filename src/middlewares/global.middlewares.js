import mongoose from 'mongoose';
import userService from "../services/user.service.js";

export const validId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "ID Inválido ¬¬'" })
    }

    next();
};

export const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado >.<" });
    }

    next();

    //Para evitar mais repetições no código
    req.id = id;
    req.user = user;
};

//FUNÇÃO ESTA CHOCANDO COM A BUSCA POR CPF .. estudar e ver o porque disso ? 