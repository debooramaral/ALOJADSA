import User from "../models/User.js";
import Produto from "../models/Produto.js";

const findUserByCpf = async (cpf) => {
    return await User.findOne({ cpf }).populate("sacola.produto");
};

const findProdutoById = async (produtoId) => {
    return await Produto.findById(produtoId);
};

const findProdutoByNome = async (produtoNome) => {
    return await Produto.findOne({
        nome:{ $regex: new RegExp(`^${produtoNome}$`, "i")}
    });
};

const addToSacola = async ({cpf, produtoId, produtoNome, quantidade}) => { 
    //adiciona e acrescenta produto, por ID ou nome e quantidade

    //Encontrar o usuário pelo CPF
    const user = await findUserByCpf(cpf);
    if (!user) throw new Error("Usuário não encontrado");

    let produto; //começa vazia

    if (produtoId){
        produto = await findProdutoById(produtoId);
        } else if (produtoNome){
            produto = await findProdutoByNome(produtoNome);
        } else {
            throw new Error("Informe o Produto");
        }
    
        if (!produto) throw new Error("Produto não encontrado");
        
    //Adicionar o produto a sacola
    const existingProduct = user.sacola.find(item => item.produto && item.produto._id.toString() === produto._id.toString());

    if (existingProduct) {
        //Se o produto ja existir na sacola, apenas atualizar a quantidade
        existingProduct.quantidade += Number(quantidade);
    } else {
        //Caso contrário, adiciona o produto a sacola
        user.sacola.push({ produto: produto._id, quantidade: Number(quantidade) });
    }

    //Salvar as alterações no usuário
    await user.save();
    //Popular os detalhes do produto
    await user.populate("sacola.produto");
    
    return user;
};

const removeFromSacola = async (cpf, produtoId) => {
    //Encontrar o usuário pelo CPF
    const user = await findUserByCpf(cpf);
    if (!user) throw new Error("Usuário não encontrado");

    //Encontrar o produto na sacola
    const produtoRemovido = user.sacola.find(item => item.produto._id.toString() === produtoId);

    console.log("Produto recebido:", produtoId);
    console.log("Produtos na sacola:", user.sacola.map(item => item.produto._id.toString()));

    //Remover o produto da sacola
    user.sacola = user.sacola.filter(item => item.produto._id.toString() !== produtoId);

    //Salvar as alterações no usuário
    await user.save();
    
    return { user, produtoRemovido };
};

const viewSacola = async (cpf) => {
    //Encontrar o usuário pelo CPF
    const user = await findUserByCpf(cpf);
    if (!user) throw new Error("Usuário não encontrado");

    return user;
};

export { addToSacola, removeFromSacola, viewSacola };
