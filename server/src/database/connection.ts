import path from 'path';
import knex from 'knex';

const databaseFile = path.resolve(__dirname, 'database.sqlite');

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: databaseFile
    },
    useNullAsDefault: true
});

export default connection;