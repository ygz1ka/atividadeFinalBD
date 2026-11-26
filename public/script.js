const formulario = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');
const pessoaId = document.getElementById('pessoaId');
const btnCancelar = document.getElementById('btnCancelar');
const btnCadastrar = formulario.querySelector('button[type="submit"]');

function cancelarEdicao() {
    formulario.reset();
    pessoaId.value = '';
    btnCadastrar.textContent = 'Cadastrar';
    btnCancelar.hidden = true;
}
btnCancelar.addEventListener('click', cancelarEdicao);

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const id = pessoaId.value;
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        data_nascimento:
            document.getElementById('data_nascimento').value
    };

    const url = id ? `/api/pessoas/${id}` : '/api/pessoas';
    const metodo = id ? 'PUT' : 'POST';

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        const resultado = await resposta.json();
        mensagem.textContent = resultado.mensagem;
        if (resposta.ok) {
            cancelarEdicao();
            await consultarPessoas();
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
        mensagem.textContent =
            'Não foi possível comunicar com o servidor.';
    }
});

const btnConsultar = document.getElementById('btnConsultar');
const listaPessoas = document.getElementById('listaPessoas');

async function consultarPessoas() {
    try {
        const resposta = await fetch('/api/pessoas');
        if (!resposta.ok) throw new Error('Falha ao consultar pessoas.');
        const pessoas = await resposta.json();
        listaPessoas.replaceChildren();
        pessoas.forEach(pessoa => {
            const linha = document.createElement('tr');
            const data = pessoa.data_nascimento
                ? pessoa.data_nascimento.substring(0, 10)
                    .split('-').reverse().join('/')
                : '';
            const valores = [
                pessoa.id, pessoa.nome, pessoa.email,
                pessoa.telefone ?? '', data
            ];
            valores.forEach(valor => {
                const celula = document.createElement('td');
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const celulaAcoes = document.createElement('td');
            const btnEditar = document.createElement('button');
            btnEditar.type = 'button';
            btnEditar.textContent = 'Editar';

            btnEditar.addEventListener('click', () => {
                pessoaId.value = pessoa.id;
                document.getElementById('nome').value = pessoa.nome;
                document.getElementById('email').value = pessoa.email;
                document.getElementById('telefone').value =
                    pessoa.telefone ?? '';
                document.getElementById('data_nascimento').value =
                    pessoa.data_nascimento
                        ? pessoa.data_nascimento.substring(0, 10)
                        : '';
                btnCadastrar.textContent = 'Salvar alterações';
                btnCancelar.hidden = false;
                mensagem.textContent = `Editando cadastro de ${pessoa.nome}`;
            });

            celulaAcoes.appendChild(btnEditar);
            linha.appendChild(celulaAcoes);

            const btnExcluir = document.createElement('button');
            btnExcluir.type = 'button';
            btnExcluir.textContent = 'Excluir';

            btnExcluir.addEventListener('click', async () => {
                const confirmacao = confirm(
                    `Deseja realmente excluir ${pessoa.nome}?`
                );
                if (!confirmacao) return;

                try {
                    const resposta = await fetch(
                        `/api/pessoas/${pessoa.id}`,
                        { method: 'DELETE' }
                    );
                    const resultado = await resposta.json();
                    mensagem.textContent = resultado.mensagem;

                    if (resposta.ok) {
                        if (pessoaId.value === String(pessoa.id)) {
                            cancelarEdicao();
                        }
                        await consultarPessoas();
                    }
                } catch (erro) {
                    console.error('Erro na exclusão:', erro);
                    mensagem.textContent =
                        'Não foi possível comunicar com o servidor.';
                }
            });

            celulaAcoes.appendChild(btnExcluir);
            listaPessoas.appendChild(linha);
        });
    } catch (erro) {
        console.error('Erro na consulta:', erro);
        mensagem.textContent = 'Não foi possível consultar as pessoas.';
    }
}
btnConsultar.addEventListener('click', consultarPessoas);
