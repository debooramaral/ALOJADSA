import Pagamento from "../models/Pagamento.js"
import User from "../models/User.js"
import Produto from "../models/Produto.js"

//Os serviços cuidam da regra de negócio, evitando repetição de código no controller.

//Criar um pagamento baseado na sacola do usuário
const createService = async (cpf) => {
    const user = await User.findOne({ cpf }).populate("sacola.produto");

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    if (!user.sacola.length) {
        throw new Error("A sacola do usuário esta vazia");
    }

    //Validar se o produto tem um preço antes de fazer o calculo
    const total = user.sacola.reduce((sum, item) => {
        if (!item.produto.preço || isNaN(item.produto.preço) || item.produto.preço <= 0) {
            throw new Error(`Produto ${item.produto.nome} tem preço inválido`);
        }
        return sum + (item.produto.preço * item.quantidade);
    }, 0); // valor inicial 0 para o reduce

    //Criar pagamento salvando os produtos completos (ID do produto)
    const pagamento = await Pagamento.create({
        user: user._id,
        produtos: user.sacola.map(item => ({
            produto: item.produto._id, //Salva apenas o ID do produto
            quantidade: item.quantidade
        })),
        total,
        status: "Pendente"
    });

    //Esvaziar a sacola do usuário após o pagamento
    user.sacola = []
    await user.save();

    return pagamento;
};

//Buscar todos os pagamentos
const findAllService = () => Pagamento.find()
    .populate("produtos.produto") //Popula os detalhes dos produtos
    .populate("user"); //Popula os detalhes do usuário

export { createService, findAllService };