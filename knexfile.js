module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: __dirname + '/db/dev.sqlite3'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
        pool: {
            afterCreate: (conn, done) => {
            conn.run("PRAGMA foreign_keys = ON", done);
            }
        }
    },
    production: {
        client: 'pg',
        connection: {
            host : process.env.DATABASE_URL,
            user : process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database : process.env.DATABASE_NAME
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds/production',
        },
    }
}