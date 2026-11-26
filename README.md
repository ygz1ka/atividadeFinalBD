# Sistema de Cadastro de Pessoas

**Atividade prática – Desenvolvimento de Banco de Dados | SENAI**

## 1. Situação de aprendizagem

Uma empresa deseja informatizar suas atividades e necessita de um banco de dados para armazenar, organizar e consultar suas informações de maneira segura. Para atender a essa necessidade, foi desenvolvido um sistema de cadastro de pessoas, seguindo o roteiro de laboratório do professor: *Cadastro de Pessoas com Node.js e MySQL*.

## 2. Objetivo

Realizar o levantamento de requisitos, a modelagem conceitual e lógica no BRModelo, a implementação física no MySQL, o controle de acesso ao banco e o desenvolvimento de uma interface para as quatro operações do CRUD.

## 3. Tecnologias utilizadas

- BRModelo — modelagem conceitual e lógica.
- MySQL e MySQL Workbench — criação e administração do banco.
- Node.js e Express — servidor e rotas da API REST.
- mysql2 e dotenv — conexão com o banco e configuração de variáveis de ambiente.
- HTML, CSS e JavaScript — interface e comunicação com a API.
- Visual Studio Code — desenvolvimento dos arquivos.

## 4. Levantamento de requisitos

### Requisitos funcionais

- Cadastrar pessoas com nome, e-mail, telefone e data de nascimento.
- Consultar os registros em ordem alfabética.
- Alterar e excluir registros existentes.
- Permitir cancelar uma edição e confirmar a exclusão.
- Impedir e-mails duplicados.

### Requisitos não funcionais

- Utilizar MySQL para armazenamento persistente.
- Manter as credenciais fora do código, no arquivo `.env`.
- Utilizar consultas SQL parametrizadas.
- Disponibilizar uma interface simples e organizada.

## 5. Modelagem do banco de dados

### Modelo conceitual (BRModelo)

Entidade **Pessoa**, com os atributos `id` (identificador), `nome`, `email`, `telefone` e `data_nascimento`.

### Modelo lógico (BRModelo)

Tabela `Cadastro_pessoa`:

| Campo | Tipo | Restrições |
| --- | --- | --- |
| id | INT | PRIMARY KEY, AUTO_INCREMENT |
| nome | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | NOT NULL, UNIQUE |
| telefone | VARCHAR(20) | Opcional |
| data_nascimento | DATE | Opcional |

### Modelo físico (MySQL)

```sql
CREATE DATABASE IF NOT EXISTS aula_conexao;
USE aula_conexao;

CREATE TABLE IF NOT EXISTS Cadastro_pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    data_nascimento DATE
);

DESCRIBE Cadastro_pessoa;
```

O roteiro utiliza apenas uma tabela. Por isso, não existem chaves estrangeiras nem relacionamentos entre entidades nesta implementação. O requisito geral de relacionamentos entre tabelas permanece pendente, caso seja exigido na entrega.

## 6. Controle de acesso

O usuário MySQL `Geraldo`@`localhost` é utilizado para a conexão da aplicação. Conforme o roteiro do professor, a concessão de acesso ao banco pode ser realizada por uma conta administrativa:

```sql
GRANT ALL PRIVILEGES ON aula_conexao.* TO 'Geraldo'@'localhost';
SHOW GRANTS FOR 'Geraldo'@'localhost';
```

O arquivo `banco.sql` do projeto oferece uma alternativa mais restrita, concedendo SELECT, INSERT, UPDATE e DELETE. Se o usuário já possuir permissões adicionais, essa concessão não as revoga automaticamente. O controle de acesso é realizado no MySQL; não foi implementado login na interface web.

## 7. Estrutura do projeto

```text
projeto-conexao/
├── public/
│   ├── cadastro.html       # Formulário e tabela de pessoas
│   ├── style.css           # Estilização da interface
│   └── script.js           # Comunicação com a API e ações do CRUD
├── servidor.js             # Servidor Express e rotas da API
├── conexao.js              # Teste de conexão com MySQL
├── teste-env.js            # Teste das variáveis de ambiente
├── banco.sql               # Criação do banco, tabela e permissões
├── testes.sql              # Comandos SQL para testar o CRUD
├── .env.example            # Modelo de configuração
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e comando de inicialização
└── README.md               # Documentação da atividade
```

Após instalar as dependências, são gerados `node_modules/` e `package-lock.json`. O arquivo `.env` deve ser criado localmente. Não publique credenciais no GitHub.

## 8. Como executar

Pré-requisitos: Node.js, npm e MySQL Server em execução, além do MySQL Workbench para administração.

1. Abra o MySQL Workbench como administrador e execute `banco.sql`, ajustando a senha de exemplo. Se o usuário já existir, utilize a senha existente.
2. Abra a pasta `projeto-conexao` no VS Code e execute no terminal:

```cmd
npm install
copy .env.example .env
```

3. Configure o arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=Geraldo
DB_PASSWORD=SuaSenha
DB_NAME=aula_conexao
```

4. Teste a conexão e inicie o servidor:

```cmd
node conexao.js
npm start
```

5. Acesse [http://localhost:3000/cadastro.html](http://localhost:3000/cadastro.html).

## 9. Rotas da API e operações CRUD

| Operação | Método HTTP | Rota | SQL |
| --- | --- | --- | --- |
| Create — Cadastro | POST | `/api/pessoas` | INSERT |
| Read — Consulta | GET | `/api/pessoas` | SELECT |
| Update — Alteração | PUT | `/api/pessoas/:id` | UPDATE |
| Delete — Exclusão | DELETE | `/api/pessoas/:id` | DELETE |

A interface envia requisições HTTP ao Express, que executa as operações no MySQL e retorna os resultados em JSON.

## 10. Testes realizados

| Teste | Resultado informado |
| --- | --- |
| Conexão com o MySQL | Funcionou |
| Cadastro de pessoa (CREATE) | Funcionou |
| Consulta de pessoas (READ) | Funcionou |
| Atualização de cadastro (UPDATE) | Funcionou |
| Exclusão de cadastro (DELETE) | Funcionou |

Os resultados foram confirmados durante a execução local pelo aluno. Testes específicos de e-mail duplicado, cancelamento de edição e cancelamento de exclusão não foram confirmados separadamente.

## 11. Checklist da atividade

- [x] Levantamento de requisitos.
- [x] Modelo conceitual no BRModelo.
- [x] Modelo lógico no BRModelo.
- [x] Modelo físico e criação da tabela no MySQL.
- [x] Controle de acesso ao banco.
- [x] Conexão entre Node.js e MySQL.
- [x] Desenvolvimento da interface.
- [x] Testes das quatro operações CRUD.
- [ ] Relacionamentos entre tabelas, se exigidos pelo enunciado geral.

## 12. Conclusão

A atividade permitiu aplicar os conceitos de modelagem de dados, chaves primárias, restrições, permissões de usuários e integração entre uma aplicação web e um banco de dados relacional. O sistema foi executado localmente e as quatro operações do CRUD foram realizadas com sucesso. A implementação segue o roteiro de cadastro de pessoas fornecido pelo professor.
