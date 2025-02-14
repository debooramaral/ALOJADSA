import User from "../models/User.js";
import Produto from "../models/Produto.js";

//Adicionar Produto a sacola
const addToSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário
    const { produtoId, quantidade } = req.body //Produto e quantidade a ser adicionada

    try {
        //Encontrar o usuário pelo CPF
        const user = await User.findOne({ cpf });
        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" });
        }

        //Verificar se o produto existe
        const produto = await Produto.findById(produtoId);
        if (!produto) {
            return res.status(400).send({ message: "Produto não encontrado" });
        }

        //Adicionar o produto a sacola
        const existingProduct = user.sacola.find(item => item.produto.toString() === produtoId);
        if (existingProduct) {
            //Se o produto ja existir na sacola, apenas atualizar a quantidade
            existingProduct.quantidade += quantidade;
        } else {
            //Caso contrário, adiciona o produto a sacola
            user.sacola.push({ produto: produtoId, quantidade });
        }

        //Salvar as alterações no usuário
        await user.save();
        await user.populate("sacola.produto"); //Popular os detalhes do produto

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
}

//Remover produto da sacola com nome do produto
const removeFromSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário
    const { produtoId } = req.body; //ID do produto a ser removido

    try {
        //Encontrar o usuário pelo CPF
        const user = await User.findOne({ cpf }).populate("sacola.produto");
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        //Encontrar o produto na sacola
        const produtoRemovido= user.sacola.find(item => item.produto._id.toString() === produtoId)

        //Remover o produto da sacola
        user.sacola = user.sacola.filter(item => item.produto.toString() !== produtoId);

        //Salvar as alterações no usuário
        await user.save();
        res.status(200).send({ 
            message: `Produto ${produtoRemovido.produto.nome} Removido da Sacola`,
            sacola: user.sacola  
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

//Visualizar sacola do usuário com dados pessoais e detalhes dos produtos
const viewSacola = async (req, res) => {
    const { cpf } = req.params; //CPF do usuário

    try {
        //Encontrar o usuário pelo CPF e popular os produtos na sacola
        const user = await User.findOne({ cpf }).populate("sacola.produto");
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        //Retornar os dados do usuário junto com a sacola e detalhes dos produtos
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
}

export { addToSacola, removeFromSacola, viewSacola };