import config from "../config";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password
});

const getConnection = () => {
    return connection;
}

module.exports = {
    getConnection
}