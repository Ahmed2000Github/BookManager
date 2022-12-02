const mysql = require("mysql");
const config = require("./dbconf");
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
});

connection.connect((err) => {
  if (!err) {
    // connection.connect(function (err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   var sql =
    //     "CREATE TABLE livres (id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENTtitre varchar(30) NOT NULL," +
    //     +"description varchar(300) NOT NULL,prix float NOT NULL,couverture varchar(60) NOT NULL,genre varchar(30) NOT NULL" +
    //     +') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";';
    //   con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    //   });
    // });
    console.log("connected to database");
  } else {
    console.log(err);
  }
});

module.exports = connection;
