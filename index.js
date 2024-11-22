const express = require('express')
const app = express();
const path = require('path')
let port = 5500;

const usuariosRuta = require('./routes/user');
const perfilesRuta = require('./routes/perfiles')

// para recibir formatos json
app.use(express.json());

// rutas
app.use('/usuarios', usuariosRuta);
app.use('/perfiles', perfilesRuta);

// home
app.use(express.static(path.join(__dirname,'public')));


// servidor en consola:  node --watch index.js
app.listen(port, () => {
    console.log((`servidor express desde puerto ${port}`));
})