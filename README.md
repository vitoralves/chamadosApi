# Sobre

Api node para disponibilizar os recursos consumidos pelo projeto chamados disponível no repositório '**chamados**', utlizando express e conectando a uma base de dados postgre. Uma cópia da base de dados para o correto funcionamento da api está na raiz do projeto com o nome '**banco**'.

## Instalação

Clone o projeto para uma pasta local e instale os módulos (**npm install**), para executar a api utilize o comando (**npm start**).</br>
A base de dados disponível '**banco**' é para o banco de dados postgre, crie um banco local e restaure a cópia.</br>
A variável de configuração da conexão deve ser alterada para os valores locais (**$SENHA** e **$BANCO**), para isso abra o arquivo '**queries.js**' que se encontra na raiz do projeto e altere os valores da variável '**connectionString**' (postgres://postgres:**$SENHA**@localhost:5432/**$BANCO**, feito isso a aplicação está pronta para uso.


