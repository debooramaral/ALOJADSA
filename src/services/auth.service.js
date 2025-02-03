import User from '../models/User.js';

//traga além do email, também a senha, anteriormente em User.js definida como escondida
const loginService = (email) => User.findOne({ email: email }).select("+senha"); 

export { loginService };