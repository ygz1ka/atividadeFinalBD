const mysql = require('mysql2/promise');
require('dotenv').config();
async function testar() {
    const conexao = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    try { console.log('Conexao realizada com sucesso!'); }
    finally { await conexao.end(); }
}
testar().catch(erro => { console.error(erro.message); process.exitCode = 1; });
