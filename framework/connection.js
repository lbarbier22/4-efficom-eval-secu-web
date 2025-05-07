const Sequelize = require('sequelize');
require('dotenv').config();

let bdd = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASSWORD, {
    dialect: process.env.BDD_DIALECT,
    host: process.env.BDD_HOST,
    port: process.env.BDD_PORT
});

let connect = async () => {
    await bdd.authenticate();
    console.log('Connection to database has been established successfully');
}

module.exports = { connect, bdd };
