module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: 'freedb.tech',
      user: 'freedbtech_gawiRoot',
      password: 'viegas123',
      database: 'freedbtech_trabDoistest'
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