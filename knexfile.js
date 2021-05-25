module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'trab2test'
    },

    migrations: {
      tableName: 'migrations',
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }

  }

};