const express = require('express') // Microframework para lidar com requisicoes e respostas http
const bodyParser = require('body-parser') // Lidando com o corpo da request
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userController = require('./controllers/userController')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

/*
 A ejs eh responsável por renderizar as views da aplicacao
 Primeiro, setamos na configuracao do nosso ap que usaremos essa engine
*/
app.set('view engine', 'ejs')

// Indicando o caminho para o diretório que compoe as views
app.set('views', __dirname + '/views')


// => Rotas

// Página inicial
app.get('/', (request, reply) => {
    reply.render('index')
})

/* 
Rota que recebe o redirecionamento do login do Google
Quando um usuario loga, a API do google envia uma requisicao POST para o endpoint que cadastramos. Neste caso, é: http://localhost:3000/logado.
Quando um POST chega nesta rota, chamamos a funcao userValidate() da classe userController. Esta funcao eh responsavel tanto por receber e tratar os dados da conta Google recebidos, quanto para renderizar a view da pagina de URI '/logado'
*/
app.post('/logado', userController.userValidate)

// Colocando o server para rodar
app.listen(3000, () => {
    console.log('Server running')
})

