const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  port: "3306",
  user: "nataphon",
  password: "nataphon",
  database: "osdb",
});

module.exports = pool;