module.exports = {
    development: {
        client: 'pg',
        connection: {
            host : 'localhost',
            user : 'postgres',
            password: 'password',
            database : 'survey_dev'
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
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