# Descrição
Este projeto é uma implementação de um sistema de autenticação utilizando a API do Google como provedor de autenticação. 
Foi desenvolvido utilizando Node.js como linguagem principal, PostgreSQL como banco de dados, Prisma como ORM (Object-Relational Mapping), Express como framework web, e JWT (JSON Web Tokens) para autenticação e autorização.

# Como executar
1. Clone o repositório: `git clone https://github.com/bruna-mafra/GoogleAuth.git`

2. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário, incluindo as credenciais da API do Google e as configurações do banco de dados.

3. Instale as dependências: `npm install`

4. Inicialize o Docker: `docker-compose up -d`

5. Execute as migrações do banco de dados: `npx prisma migrate dev`

6. Inicie o servidor: `npm run start`

<br>

Certifique-se de ter o Node.js e o Docker instalados em sua máquina antes de executar o projeto. <br>Para obter seu Client ID, é necessário criar uma aplicação no Google Cloud Platform (https://console.developers.google.com/apis/credentials?hl=pt-br)
