const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  extra: {
    // Este "extra {}" es para poder acceder a heroku
    //tambien debes agregar PGSSLMODE=no-verify en las variables de entorno de heroku
    ssl: true,
  },
});

module.exports = pool;
