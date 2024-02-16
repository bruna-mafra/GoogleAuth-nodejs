const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config();

exports.userValidate = async function (request, reply) {


    const ticket = await client.verifyIdToken({
        idToken: request.body.credential,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // Codigo acima fornecido pela api do google para verificar o token recebido na requisicao POST

    // Aqui, atribuimos às nossas variaveis sub, name e email, os valores, respectivamente, de payload[sub], payload[name], payload[email]
    const { sub, name, email } = payload;

    // Verificacao se o sub(googleId) do usuario em questao ja existe no DB
    try {
        // Utilizamos o prisma para facilitar a consulta
        const user = await prisma.user.findFirst({
            where: {
                googleId: sub
            }
        })

        let mensagem  // Variavel que posteriormente vai receber a mensagem de entrada para o usuario
        if (user) {
            console.log("Usuário existe")
            mensagem = `Olá, ${name}! Seja bem vindo(a) de volta.`;
        } else {
            mensagem = `Olá, ${name}! Este é seu primeiro acesso.`

            // Se o usuario nao existe no DB, realizamos o insert (atraves do prisma/funcao create())
            const create = await prisma.user.create({
                data: {
                    name,
                    email,
                    googleId: sub,
                }
            })
            console.log("Usuário inserido no DB")
        }

        return reply.render("logado", { mensagem })  // Renderizando a view e passando o que vai ser subtituindo no front ({mensagem})

    } catch (error) {
        console.error(error)
    }
}