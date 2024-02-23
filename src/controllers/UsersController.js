const knex = require('../database/knex')
const { hash, compare } = require("bcryptjs")
const AppError = require('../utils/AppError')

class UsersController {

    async create(request, response){
        const { name, email, senha} = request.body

        const password = await hash(senha, 8)

        const checkUserExists = await knex('users').where({ email }).first()

        if (checkUserExists) {
            throw new AppError("Esse usuário já existe")
        }

        console.log(password)

        await knex("users").insert({
            name,
            email,
            password
        })

        return response.json()
    }

    async index(request, response) {
        const { email, senha } = request.query

        const user = await knex('users').where({ email }).first()

        if(!user) {
            throw new AppError("Usuário não encontrado")
        }

        const checkOldPassword = await compare(senha, user.password)

        if (!checkOldPassword) {
            throw new AppError("A senha informada está incorreta.")
        }

        return response.json(user)
    }
}

module.exports = UsersController