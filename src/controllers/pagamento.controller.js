import { createService, findAllService } from "../services/pagamento.service.js"

//Criar pagamento com base na sacola do usuário
const create = async (req, res) => {
    try {
        const { cpf } = req.params; //O CPF vem pela URL, como parametro

        //Chama o serviço para criar o pagamento
        const pagamento = await createService(cpf);

        res.status(201).send(pagamento); //Retorna o pagamento criado
    } catch (err) {
        return res.status(500).send({ message: err.message }); //Trata o erro e retorna a mensagem
    }

}

//Buscar todos os pagamenos
const findAll = async (req, res) => {
    try {
        const pagamento = await findAllService(); //Chama o serviço para buscar todos os pagamentos

        if (pagamento.length === 0) {
            return res.status(404).send({
                message: "Nenhum pagamento encontrado",
            });
        }

        res.status(200).send(pagamento); //Retorna os pagamentos encontrados
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

export { create, findAll };