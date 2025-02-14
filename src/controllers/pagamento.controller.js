import { createService, findAllService } from "../services/pagamento.service.js"

const create = async (req, res) => {
    try {
        //Os demais dados serão feito automaticamente pelo login
        const { nomeProduto } = req.body;

        if (!nomeProduto) {
            res.status(400).send({
                message: "Envie o nome de produto para pagamento",
            })
        }

        await createService({
            nomeProduto,
            user: "cpf",
        });

        res.send(201);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}

const findAll = async (req, res) => {
    const pagamento = await findAllService();

    if (pagamento.length === 0) {
        return res.status(400).send({
            message: "Não há itens para pagamento",
        })
    }
    res.send(pagamento);
}

export { create, findAll };