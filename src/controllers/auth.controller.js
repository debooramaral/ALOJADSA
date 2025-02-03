import bcrypt from 'bcrypt'
import { loginService } from '../services/auth.service.js';

const login = async (req, res) => {
    //Recebe os dados através do front-end
    const { email, senha } = req.body;

    try {
        //Buscar o usuário no banco de dados
        const user = await loginService(email);

        //Se usuário não estiver correto
        if (!user) {
            return res.status(404).send({ message: "Usuário ou Senha Invalido" })
        }

        //Validando os campos, comparando as senhas com bcrypt
        const senhaValida = await bcrypt.compare(senha, user.senha)

        //Se não for iguais, se a senha não esta correta, erro
        if (!senhaValida) {
            return res.status(404).send({ message: "Usuário ou Senha Invalido" })
        }

        res.send("Login OK");
    } catch (err) {
        res.status(500).send(err.message);
    }

};

export { login };