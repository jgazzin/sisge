const db = require('../db/database');

const obtenerPerfil = (req, res) => {
    const sql = 'SELECT * FROM perfiles';
    db.query(sql, (err, result) => {
        if(err){
            console.log('Error obteniendo perfil: ', err);
            res.status(500).json({mensaje: 'Error obteniendo usuarios'});
            return;
        }
        res.json(result);
    })
}

const crearPerfil = (req, res) => {
    const {nombre, apellido, oficio} = req.body;
    const sql = 'INSERT INTO usuarios (nombre, apellido, oficio) VALUES (?, ?, ?)';

    db.query(sql, [nombre, apellido, oficio], (err, result) => {
        if(err){
            console.log('Error creando perfil: ', err);
            res.status(500).json({mensaje: 'Error creando perfil'});
            return;
        }
        res.json({
            mensaje: 'Perfil creado con éxito',
            idPerfil: result.insertId});
    })
}

const obtenerPerfilID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM perfiles WHERE id_user = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        } 
        res.json(result);
    })
};

module.exports = { obtenerPerfil, crearPerfil, obtenerPerfilID };