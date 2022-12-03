# Projeto: Planeta Plan

# Integrantes:
|Aluno|RA  |Disciplina|
|--|--|--|
|André Felipe Andrade Galvão|200351|UPX|
|  Gabriel Rocha Monaco|171092  |UPX e Mobile|
|Livia Oliveira Spinardi| 191051|UPX e Mobile|
|Willians Ferreira| 190520|Mobile|
# Resumo
O aplicativo tem as seguintes funcionalidades:

 - Login
 - Disponibilizar horarios de reuniao
 - Gerar link de escolha de reuniao
 - Visualização de reunioes marcadas
 
 No site tem a seguinte funcionalidade
 
 - Escolher horario baseado em id de usuario

# Para funcionar
Para o funcionamento do projeto, é necessario de variaveis de ambientes.
## App
Crie um arquivo .env na pasta app com as seguintes propriedades:

API_URL=http://172.17.96.75:3000/

WEBSITE_URL=http://localhost:3006/

A API_URL deve conter o ipv4 de sua maquina ( use o comando ipconfig no cmd para achar o ipv4)
## Backend
No backend, coloque o .env enviado no zip junto com o envio da matéria, coloque ele dentro da pasta backend.
Não é seguro escrever aqui a propriedade pois ela vai conter a hash da senha e a string de conexão com o banco de dados.

## Site
Crie um .env na pasta site e coloque a seguinte propriedade.

REACT_APP_API_URL=http://localhost:3000/

## Adendo
O também sera enviado um zip com o projeto completo (sem a pasta modules) com o .env já parcialmente configurado, só apenas necessitando a inserção do ipv4 da maquina no .env do App.

