import {
  createService,
  findAllService,
} from "../services/pagamento.service.js";

//Criar pagamento com base na sacola do usuário
const create = async (req, res) => {
  try {
    const { cpf } = req.params; //O CPF vem pela URL, como parametro

    //Chama o serviço para criar o pagamento
    const pagamento = await createService(cpf);

    res
      .status(201)
      .send("Pagamento criado com sucesso: " + JSON.stringify(pagamento)); //Retorna o pagamento criado
  } catch (err) {
    return res.status(500).send({ message: err.message }); //Trata o erro e retorna a mensagem
  }
};

//Buscar todos os pagamenos
const findAll = async (req, res) => {
  try {
    const pagamento = await findAllService(); //Chama o serviço para buscar todos os pagamentos

    if (pagamento.length === 0) {
      return res.status(404).send({
        message: "Nenhum pagamento encontrado",
      });
    }

    //Criar um mapa para armazenar a soma de pagamentos por usuário
    const pagamentosPorUsuario = {};
    //Variavel para armazenar o valor total de compras
    let somaTotalCompras = 0;

    pagamento.forEach((pagamento) => {
      const userId = pagamento.usuario?.id.toString(); //Garante que pega p ID corretamente
      const valorPagamento = pagamento.total; //Acessa o valor total de pagamento

      if (!userId) {
        return; //Se não tiver um ID, não continua a iteração
      }

      if (!pagamentosPorUsuario[userId]) {
        pagamentosPorUsuario[userId] = { totalPagamentos: 0, totalCompra: 0 };
      }

      pagamentosPorUsuario[userId].totalPagamentos += 1; //Incrementa a contagem de pagamentos do usuário
      pagamentosPorUsuario[userId].totalCompra += valorPagamento; //Soma o valor do pagamento ao total de usuário
      somaTotalCompras += valorPagamento; //Soma o valor do pagamento ao total global
    });

    //Numero total de usuários distintos
    const totalUsuarios = Object.keys(pagamentosPorUsuario).length;

    //Formatar o retorno com objetos para cada informação
    let resposta = {
      totalUsuarios: totalUsuarios,
      detalhesUsuarios: [],
      somaTotalCompras: somaTotalCompras,
    };

    //Adicionar o total de compra de cada usuário
    Object.keys(pagamentosPorUsuario).forEach((userId) => {
      const { totalCompra } = pagamentosPorUsuario[userId];
      resposta.detalhesUsuarios.push({
        userId: userId,
        totalCompra: totalCompra,
      });
    });

    res.status(200).send({
        totalUsuarios: resposta.totalUsuarios,
        detalhesUsuarios: resposta.detalhesUsuarios,
        somaTotalCompras: resposta.somaTotalCompras,
    });

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { create, findAll };
