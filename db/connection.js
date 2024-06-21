const mysql = require('mysq12');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'

});

connection.connect(function(err) {
    console.log('Connected to the database!');
});

module.exports = connection;