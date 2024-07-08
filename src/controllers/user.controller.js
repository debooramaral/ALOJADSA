const x = (req, res) => {
    const x = 5 + 5;

    res.send({ x: x })
};

module.exports = { x };