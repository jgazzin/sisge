const db = require('../db/database');

const obtenerUsuarios = (req, res) => {
    const sql = 'SELECT * FROM sisge_usuarios';
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.json(result);
    })
}

const crearUsuario = (req, res) => {
    const {email, password} = req.body;
    const sql = 'INSERT INTO sisge_usuarios (email, password) VALUES (?, ?)';

    db.query(sql, [email, password], (err, result) => {
        if(err){
            throw err;
        }
        res.json({
            mensaje: 'Usuario creado con éxito',
            idUsuario: result.insertId});
    })
}

const obtenerUserID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM sisge_usuarios WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) {
            throw err;
        } 
        res.json({
            mensaje: 'Usuario obtenido con éxito',
        });
    })
};

module.exports = { obtenerUsuarios, crearUsuario, obtenerUserID };