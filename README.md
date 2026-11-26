# Cadastro de Pessoas
Projeto de laboratorio baseado no roteiro do professor. Servidor e script extraidos dos apendices; CSS e separacao de arquivos acrescentados.

1. No MySQL Workbench, como administrador, execute banco.sql. Se o usuario ja existir, use a senha dele; CREATE USER IF NOT EXISTS nao altera senhas existentes. Confira SHOW GRANTS: privilegios anteriores nao sao removidos pelo GRANT.
2. No terminal CMD, na pasta projeto-conexao, execute `npm install`.
3. Execute `copy .env.example .env` e ajuste as credenciais. Nao publique o .env.
4. Execute `node teste-env.js` e `node conexao.js`.
5. Execute `npm start` e abra http://localhost:3000/cadastro.html.
6. Teste cadastrar, consultar, editar, cancelar edicao e excluir. Use testes.sql para conferir o CRUD no Workbench.

Modelo BRModelo: entidade Pessoa com id identificador, nome, email, telefone e data_nascimento. Uma unica tabela, sem relacionamentos, conforme o roteiro. O enunciado geral pede relacionamentos; se forem obrigatorios, modele uma entidade adicional com autorizacao do professor. Nao inclui autenticacao web; o controle de acesso e do MySQL. Usar somente localmente com dados ficticios.

Validacao: sintaxe JavaScript verificada quando Node disponivel; conexao real e CRUD precisam ser testados no MySQL local.
