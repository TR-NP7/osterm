const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "52.253.95.11",
  port: "3308",
  user: "root",
  password: "tartardb",
  database: "db",
});

module.exports = pool;