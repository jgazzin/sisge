const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: "sql3718803",
});

connection.connect((err) => {
  if (err) {
    console.log("error de coonexión BD: ", err);
    return;
  }
  console.log("conexión BD establecida");

  connection.query("CREATE DATABASE IF NOT EXISTS sql3718803", (err, res) => {
    if (err) {
      console.log("error creando base de datos");
      return;
    }
    console.log("base de datos creada");

    connection.changeUser({ database: "sql3718803" }, (err, res) => {
      if (err) {
        console.log("error cambiando usuario");
        return;
      }
      console.log("usuario cambiado");

      // tabla ususarios
      const createtableUsuariosQuery = `
        CREATE TABLE IF NOT EXISTS sisge_usuarios(
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(10) NOT NULL,
        perfil INT,
        contacto INT,
        direccion INT);
      `;

      connection.query(createtableUsuariosQuery, (err, result) => {
        if (err) {
          console.log("Error creando la tabla ususarios: ", err);
          return;
        }
        console.log("Tabla usuarios asegurada");
      });

      // tabla perfiles
      const createtablePerfilesQuery = `
        CREATE TABLE IF NOT EXISTS sisge_perfiles(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50),
        oficio VARCHAR(50),
        id_user INT NOT NULL);
      `;

      connection.query(createtablePerfilesQuery, (err, result) => {
        if (err) {
          console.log("Error creando la tabla perfiles: ", err);
          return;
        }
        console.log("Tabla perfiles asegurada");
      });

    });
  });
});

module.exports = connection;
