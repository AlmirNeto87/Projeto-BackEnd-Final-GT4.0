
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

class UserService {

    async listar() {

        const users = await UserModel.findAll({
            attributes: { exclude: ['password'] }
        });

        if (!users) {
            throw new Error('Usuário não encontrado!');
        }

        return users;
    }


    // BUSCAR USUÁRIO POR ID
    async listarPorId(id) {

        const user = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new Error('Usuário não encontrado!');
        }

        return user;
    }

    // CRIAR USUÁRIO
    async criar(data) {

        const userExists = await UserModel.findOne({
            where: { email: data.email }
        });

        if (userExists) {
            throw new Error('Usuário já cadastrado!');
        }

        const passwordHash = await bcrypt.hash(
            data.password,
            12
        );

        const user = await UserModel.create({
            firstname: data.firstname,
            surname: data.surname,
            email: data.email,
            password: passwordHash
        });

        // Não retornar a senha
        const { password, ...userSemSenha } = user.toJSON();

        return userSemSenha;
    }

    // ATUALIZAR USUÁRIO
    async atualizar(id, data) {

        const user = await UserModel.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado!');
        }

        // Se a senha foi enviada, gerar um novo hash
        if (data.password !== undefined) {

            if (
                typeof data.password !== 'string' ||
                data.password.length === 0
            ) {
                throw new Error('A senha não pode ser vazia!');
            }

            data.password = await bcrypt.hash(
                data.password,
                12
            );
        }

        // Atualizar os dados
        await user.update(data);

        // Buscar usuário atualizado sem senha
        const userAtualizado = await UserModel.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        return userAtualizado;
    }

    // DELETAR USUÁRIO
    async deletar(id) {

        const user = await UserModel.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado!');
        }

        await user.destroy();

        return true;
    }
}

module.exports = UserService;
