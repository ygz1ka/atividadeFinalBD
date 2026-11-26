require('dotenv').config();
for (const chave of ['DB_HOST','DB_PORT','DB_USER','DB_PASSWORD','DB_NAME']) {
    console.log(chave + ': ' + (process.env[chave] ? 'configurado' : 'ausente'));
}
