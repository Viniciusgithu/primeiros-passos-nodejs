//O arquivo possui a função de chamar a conexão com o bando de dados MySQL
import mysql from 'mysql'

const connection = mysql.createConnection({

  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'qgLU@o2FT',
  database: 'db_api_rest'

});

connection.connect()

export default connection