import express from 'express'

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    //  JSON

    response.send([
        'Diego',
        'Cleiton',
        'Robson',
        'Daniel'
    ])
});

app.listen(3001);
