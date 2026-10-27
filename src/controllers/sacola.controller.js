import * as sacolaService from "../services/sacola.service.js";

//Adicionar Produto a sacola - CPF
const addToSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário
    const { produtoId, produtoNome } = req.body; //Produto a ser adicionada
    const quantidade = Number(req.body.quantidade); //Quantidade forçando numero

    try {
        //Pega do service
        const user = await sacolaService.addToSacola({cpf, produtoId, produtoNome, quantidade});
        //Detalhes do usuário e do produto
        res.status(200).send({
            message: "Produto adicionado à sacola",
            usuario: {
                nome: user.nome,
                cpf: user.cpf,
                telefone: user.telefone,
                email: user.email
            },
            sacola: user.sacola
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const removeFromSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário
    const { produtoId } = req.body; //Produto e quantidade a ser adicionada

    try {
        //Pega do service
        const { user, produtoRemovido } = await sacolaService.removeFromSacola(cpf, produtoId);
        //Detalhes do usuário e do produto
        res.status(200).send({
            message: `Produto ${produtoRemovido.produto.nome} Removido da Sacola`,
            sacola: user.sacola
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const viewSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário

    try {
        //Pega do service
        const user = await sacolaService.viewSacola(cpf);
        //Detalhes do usuário e do produto
        res.status(200).send({
            usuario: {
                nome: user.nome,
                cpf: user.cpf,
                telefone: user.telefone,
                email: user.email
            },
            sacola: user.sacola.map(item => ({
                produto: item.produto,
                quantidade: item.quantidade
            }))
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}; 

export { addToSacola, removeFromSacola, viewSacola };
