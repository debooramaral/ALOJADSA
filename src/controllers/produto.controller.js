const createProduto = (req, res) => {
    const produtof = req.body;

    res.json(produtof)
}

module.exports = { createProduto }