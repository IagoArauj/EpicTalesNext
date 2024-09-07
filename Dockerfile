# Use a imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo de dependências
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação
COPY . .

# Exponha a porta que o Next.js vai usar
EXPOSE 3000

# Defina o comando para iniciar o Next.js
CMD ["npm", "run", "dev"]
