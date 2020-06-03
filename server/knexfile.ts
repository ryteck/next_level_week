import path from 'path';

const databaseFile = path.resolve(__dirname, 'src', 'database', 'database.sqlite');
const migrationsDirectory = path.resolve(__dirname, 'src', 'database', 'migrations');
const seedsDirectory = path.resolve(__dirname, 'src', 'database', 'seeds');

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: databaseFile
    },
    migrations: {
        directory: migrationsDirectory
    },
    seeds: {
        directory: seedsDirectory
    },
    useNullAsDefault: true
};