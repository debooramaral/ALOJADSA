import User from '../models/User.js';
import jwt from 'jsonwebtoken';

//traga além do email, também a senha, anteriormente em User.js definida como escondida
const loginService = (email) => User.findOne({ email: email }).select("+senha"); 

//Token que guarda a sessão de usuário e o front-end saber quem é o usuário logado
const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});

export { loginService, generateToken };