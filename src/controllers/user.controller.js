import mongoose from "mongoose";
import userService from "../services/user.service.js";

// import isValidCPF from "../utils/validateCpf.js"

//auxilio do cunhado Kbça
const create = async (req, res) => {
    try {
        const camposObrigatorios = [
            'nome', 'cpf', 'telefone', 'endereço', 'email',
            'senha', 'formapagamento', 'numerocartao',
            'nometitular', 'datavalidade', 'codigosegurança'
        ];

        // Verificar se todos os campos obrigatórios estão presentes
        const camposFaltando = camposObrigatorios.filter(campo => !req.body[campo]);

        if (camposFaltando.length > 0) {
            return res.status(400).send({
                message: `Preencha todos os campos para cadastro de usuário. Faltando: ${camposFaltando.join(', ')}`
            });
        }

        // Verificar se o CPF é válido
        const cpf = req.body.cpf;

        // Verificar se o CPF já existe no banco de dados
        const cpfExiste = await userService.findUserByCPF(cpf);
        if (cpfExiste) {
            return res.status(400).send({ message: "CPF já cadastrado" });
        }

        // Criar o usuário no banco de dados
        const user = await userService.createService(req.body);
        if (!user) {
            return res.status(400).send({ message: "Erro na criação do usuário" });
        }

        res.status(201).send({
            message: "Usuário criado com sucesso",
            user: {
                id: user._id,
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                endereço: req.body.endereço,
                email: req.body.email,
                formapagamento: req.body.formapagamento,
                numerocartao: req.body.numerocartao,
                nometitular: req.body.nometitular,
                datavalidade: req.body.datavalidade,
                codigosegurança: req.body.codigosegurança,
            },
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsersService();

        if (users.length === 0) {
            return res.status(400).send({ message: "Não há usuários cadastrados" })
        }

        res.send(users)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//Função aplicada para o Middleware.. mas não funciona, não mostra os dados de usuário 
const findById = async (req, res) => {
    try {
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).send({ message: "ID Inválido" })
        // }

        const user = req.user;

        // if (!user) {
        //     return res.status(404).send({ message: "Usuário não encontrado :/" });
        // }

        res.send(user)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//função adicionada a portir do chatgpt 

const getUserByCPF = async (req, res) => {
    try {
        const cpf = req.params.cpf;

        const user = await userService.findUserByCPF(cpf);

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" })
        }

        res.send(user)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
};

//auxilio do cunhado kbça 
const update = async (req, res) => {
    try {
        const {
            nome,
            telefone,
            endereço,
            email,
            senha,
            formapagamento,
            numerocartao,
            nometitular,
            datavalidade,
            codigosegurança,
        } = req.body;

        const cpf = req.params.cpf;

        // Buscar o usuário no banco
        const user = await userService.findUserByCPF(cpf);
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        // Verificar se os valores enviados são iguais aos armazenados
        const isUnchanged =
            //enviados (cliente) ----- armazenados (banco)
            (nome === user.nome) &&
            (telefone === user.telefone) &&
            (endereço === user.endereço) &&
            (email === user.email) &&
            (senha === user.senha) &&
            (formapagamento === user.formapagamento) &&
            (numerocartao === user.numerocartao) &&
            (nometitular === user.nometitular) &&
            (datavalidade === user.datavalidade) &&
            (codigosegurança === user.codigosegurança);

        if (isUnchanged) {
            return res.status(400).send({ message: "Nenhuma alteração detectada. Atualize pelo menos um campo." });
        }

        // Filtrar apenas os campos que precisam ser atualizados
        const camposParaAtualizar = {};
        if (nome !== user.nome) camposParaAtualizar.nome = nome;
        if (telefone !== user.telefone) camposParaAtualizar.telefone = telefone;
        if (endereço !== user.endereço) camposParaAtualizar.endereço = endereço;
        if (email !== user.email) camposParaAtualizar.email = email;
        if (senha !== user.senha) camposParaAtualizar.senha = senha;
        if (formapagamento !== user.formapagamento) camposParaAtualizar.formapagamento = formapagamento;
        if (numerocartao !== user.numerocartao) camposParaAtualizar.numerocartao = numerocartao;
        if (nometitular !== user.nometitular) camposParaAtualizar.nometitular = nometitular;
        if (datavalidade !== user.datavalidade) camposParaAtualizar.datavalidade = datavalidade;
        if (codigosegurança !== user.codigosegurança) camposParaAtualizar.codigosegurança = codigosegurança;

        // Atualizar os dados do usuário
        await userService.updateServiceB(cpf, camposParaAtualizar);

        res.send({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).send({ message: "Erro interno no servidor" });
    }
};

export default { create, findAllUsers, getUserByCPF, update, findById };

