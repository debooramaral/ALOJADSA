import dotenv from 'dotenv' //Posição sugerida pelo chat gpt
dotenv.config(); 

import express from 'express';
const app = express();

import connectDataBase from './src/database/db.js';
const port = 3000;
connectDataBase();

import userRoute from '../ALOJADSA/src/routes/user.route.js';
import produtoRoute from '../ALOJADSA/src/routes/produto.route.js';

app.use(express.json())
app.use("/user", userRoute);
app.use("/produto", produtoRoute);

app.listen(port, () => console.log(`Servidor Rodando na Porta ${port}`)); 

