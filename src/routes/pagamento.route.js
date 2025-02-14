import { Router } from 'express';
const route = Router()

import { create, findAll } from "../controllers/pagamento.controller.js";

route.post("/", create);
route.get("/", findAll);

export default route;