import Produto from "../models/Produto.js";

const createProdutoService = (body) => Produto.create(body);

const findAllProdutosService = () => Produto.find();

const findByIdService = (id) => Produto.findById(id);

//Tras array, uma lista de nomes
const searchByNomeService = (nome) => Produto.find({
    nome: { $regex: `${nome || ""}`, $options: "i" }
});

//Traz apenas um item ou nulo, para lidar apenas com um documento
const findProdutoByNome = (nome) => Produto.findOne({ nome });

const updateService = async (nome, camposParaAtualizar) => {
    await Produto.findOneAndUpdate(
        { nome },
        { $set: camposParaAtualizar },
        { new: true }
    );
};

export default { createProdutoService, findAllProdutosService, findByIdService, searchByNomeService, updateService, findProdutoByNome };