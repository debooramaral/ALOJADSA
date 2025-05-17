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
    //Controle de pagamentos únicos
    const pagamentosProcessados = new Set();
    //Variavel para armazenar o valor total de compras
    let somaTotalCompras = 0;

    pagamento.forEach((pagamento) => {
      const pagamentoId = pagamento._id?.toString(); //Separa pagamento por ID
      const userId = pagamento.usuario?.id.toString(); //Garante que pega o ID corretamente
      const userName = pagamento.usuario?.nome; //Obtendo o nome do usuário
      const valorPagamento = pagamento.total; //Acessa o valor total de pagamento

      // Verifica se pagamento já foi processado
      if (!userId || pagamentosProcessados.has(pagamentoId)) return;
      pagamentosProcessados.add(pagamentoId);

      if (!userId) {
        return; //Se não tiver um ID, não continua a iteração
      }

      if (!pagamentosPorUsuario[userId]) {
        pagamentosPorUsuario[userId] = { nome: userName, totalCompra: 0 };
      }

      pagamentosPorUsuario[userId].totalCompra += valorPagamento; //Soma o valor do pagamento ao total de usuário
      somaTotalCompras += valorPagamento; //Soma o valor do pagamento ao total global

    });

    const resposta = {
    //Numero total de usuários distintos
    totalUsuarios: Object.keys(pagamentosPorUsuario).length,
    //detalhes da compra do usuário
    detalhesUsuarios: [],
    somaTotalCompras: somaTotalCompras,
    }

    //Adicionar o total de compra de cada usuário
    Object.keys(pagamentosPorUsuario).forEach((userId) => {
      const { nome, totalCompra } = pagamentosPorUsuario[userId];
      resposta.detalhesUsuarios.push({
        userId: userId,
        nome: nome, 
        totalCompra: totalCompra,
      });
    });

    res.status(200).send(resposta);

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { create, findAll };
