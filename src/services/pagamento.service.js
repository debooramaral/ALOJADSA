import Pagamento from "../models/Pagamento.js"

const createService = (body) => Pagamento.create(body);
const findAllService = () => Pagamento.find();

export { createService, findAllService };