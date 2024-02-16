# Use a imagem oficial do Node.js como base
FROM node:latest

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instalação do PostgreSQL
RUN apt-get update && \
    apt-get install -y postgresql-client

# Copia o arquivo .env para o diretório de trabalho
COPY .env ./

# Define as variáveis de ambiente diretamente no Dockerfile
ENV $(cat .env | xargs)

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
