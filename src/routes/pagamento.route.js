import { Router } from 'express';
const route = Router()

import { create, findAll } from "../controllers/pagamento.controller.js"; 

//Criar pagamento baseadi na sacola do usuário
route.post("/:cpf", create);

//Buscar todos os pagamentos
route.get("/", findAll);

export default route;