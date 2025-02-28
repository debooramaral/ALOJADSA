import Pagamento from "../models/Pagamento.js";
import User from "../models/User.js";
import Produto from "../models/Produto.js";

//Os serviços cuidam da regra de negócio, evitando repetição de código no controller.

// Função interna para formatar os pagamentos

const formatarPagamento = (pagamento) => ({
  id: pagamento._id,
  usuario: pagamento.user
    ? {
        //Adicionei verificações para garantir que user e produtos estejam devidamente populados
        id: pagamento.user._id,
        nome: pagamento.user.nome,
        email: pagamento.user.email,
        cpf: pagamento.user.cpf,
      }
    : null,
  produto: pagamento.produto
    ? pagamento.produto.map((item) => ({
        //Adicionei verificações para garantir que user e produtos estejam devidamente populados
        id: item.produto._id,
        nome: item.produto.nome,
        preço: item.produto.preço,
        quantidade: item.quantidade,
      }))
    : [],
  total: pagamento.total,
  status: pagamento.status,
  criadoEm: pagamento.createdAt,
});

//Criar um pagamento baseado na sacola do usuário
const createService = async (cpf) => {
  try {
    const user = await User.findOne({ cpf }).populate("sacola.produto");

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (!user.sacola.length) {
      throw new Error("A sacola do usuário esta vazia");
    }

    //Validar se o produto tem um preço antes de fazer o calculo
    const total = user.sacola.reduce((sum, item) => {
      if (
        !item.produto.preço ||
        isNaN(item.produto.preço) ||
        item.produto.preço <= 0
      ) {
        throw new Error(`Produto ${item.produto.nome} tem preço inválido`);
      }
      return sum + item.produto.preço * item.quantidade;
    }, 0); // valor inicial 0 para o reduce

    //Criar pagamento salvando os produtos completos (ID do produto)
    const novoPagamento = await Pagamento.create({
      user: user._id,
      produto: user.sacola.map((item) => ({
        produto: item.produto._id, //Salva apenas o ID do produto
        quantidade: item.quantidade,
      })),
      total,
      status: "Pendente",
    });

    //Buscar o pagamento criado e popula os detalhes necessarios
    const pagamento = await Pagamento.findById(novoPagamento._id)
      .populate("user")
      .populate("produto.produto");

    return formatarPagamento(pagamento);
  } catch (error) {
    throw new Error(error.message);
  }
};

//Buscar todos os pagamentos
const findAllService = async () => {
  const pagamento = await Pagamento.find()
    .populate("produto.produto") //Popula os detalhes dos produtos
    .populate("user"); //Popula os detalhes do usuário

  return pagamento.map(formatarPagamento);
};

export { createService, findAllService, formatarPagamento };
