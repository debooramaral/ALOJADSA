const express = require("express");
const app = express();

const userRoute = require("../ALOJADSA/src/routes/user.route");
const produtoRoute = require("../ALOJADSA/src/routes/produto.route");

const port = 3000;

app.use(express.json())
app.use("/user", userRoute);
app.use("/produto",produtoRoute);

app.listen(port, () => console.log(`Servidor Rodando na Porta ${port}`));