const createProduto = (req, res) => {
    const {nome, preço, imagem, tipo, descrição} = req.body;

    if(!nome, !preço, !imagem, !tipo, !descrição){
        res.status(400).send({message: "Preencha todos os campos para cadastrar produtos"})
    }

    res.status(201).send({
        message: "Produto criado com sucesso",
        produto: {
            nome,
            preço,
            imagem,
            tipo,
            descrição,
        },
    });
}

module.exports = { createProduto }