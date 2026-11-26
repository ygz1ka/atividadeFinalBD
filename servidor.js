const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();
 
const app = express();
const PORTA = 3000;
 
app.use(express.json());
app.use(express.static('public'));
 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
 
app.get('/', (req, res) => {
    res.send('Servidor Node.js funcionando!');
});
 
app.post('/api/pessoas', async (req, res) => {
    try {
        const { nome, email, telefone, data_nascimento } = req.body;
 
        if (typeof nome !== 'string' || !nome.trim() ||
            typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                mensagem: 'Nome e e-mail são obrigatórios.'
            });
        }
 
        const sql = `
            INSERT INTO Cadastro_pessoa
                (nome, email, telefone, data_nascimento)
            VALUES (?, ?, ?, ?)
        `;
 
        const valores = [
            nome.trim(), email.trim(),
            telefone || null, data_nascimento || null
        ];
 
        const [resultado] = await pool.execute(sql, valores);
        res.status(201).json({
            mensagem: 'Pessoa cadastrada com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        console.error('Erro ao cadastrar:', erro);
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Este e-mail já está cadastrado.'
            });
        }
        res.status(500).json({
            mensagem: 'Erro ao cadastrar pessoa.'
        });
    }
});
 
// Consulta todas as pessoas
app.get('/api/pessoas', async (req, res) => {
    try {
        const sql = `
            SELECT id, nome, email, telefone, data_nascimento
            FROM Cadastro_pessoa
            ORDER BY nome ASC
        `;
        const [pessoas] = await pool.execute(sql);
        res.status(200).json(pessoas);
    } catch (erro) {
        console.error('Erro ao consultar pessoas:', erro);
        res.status(500).json({
            mensagem: 'Erro ao consultar pessoas.'
        });
    }
});
 
// Atualiza uma pessoa existente
app.put('/api/pessoas/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { nome, email, telefone, data_nascimento } = req.body;
 
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: 'ID inválido.' });
        }
        if (typeof nome !== 'string' || !nome.trim() ||
            typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                mensagem: 'Nome e e-mail são obrigatórios.'
            });
        }
 
        const sql = `
            UPDATE Cadastro_pessoa
            SET nome = ?, email = ?, telefone = ?,
                data_nascimento = ?
            WHERE id = ?
        `;
        const valores = [
            nome.trim(), email.trim(), telefone || null,
            data_nascimento || null, id
        ];
        const [resultado] = await pool.execute(sql, valores);
 
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pessoa não encontrada.'
            });
        }
        res.status(200).json({
            mensagem: 'Cadastro atualizado com sucesso!'
        });
    } catch (erro) {
        console.error('Erro ao atualizar:', erro);
        if (erro.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Este e-mail já está cadastrado.'
            });
        }
        res.status(500).json({
            mensagem: 'Erro ao atualizar cadastro.'
        });
    }
});
 
// Exclui uma pessoa pelo ID
app.delete('/api/pessoas/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({ mensagem: 'ID inválido.' });
        }
        const sql = 'DELETE FROM Cadastro_pessoa WHERE id = ?';
        const [resultado] = await pool.execute(sql, [id]);
 
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pessoa não encontrada.'
            });
        }
        res.status(200).json({
            mensagem: 'Pessoa excluída com sucesso!'
        });
    } catch (erro) {
        console.error('Erro ao excluir:', erro);
        res.status(500).json({
            mensagem: 'Erro ao excluir pessoa.'
        });
    }
});
 
// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor iniciado na porta ${PORTA}`);
    console.log(`Acesse: http://localhost:${PORTA}`);
});
