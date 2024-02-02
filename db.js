const Pool = require('pg').Pool
const dotenv = require("dotenv");

const env = dotenv.config().parsed;


const pool = new Pool({
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.HOST_DATABASE,
    database: env.DB_NAME,
    port: env.PORT,
})

module.exports = pool