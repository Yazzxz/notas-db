var mysql = require('mysql');
const { compileFunction } = require('vm');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notas'
});

const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const coneccion = require("./conexion")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});
app.post('/respuesta', (req, res) => {

    res.send("Titulo:" + req.body.titulo + "\n" + "descripcion: " + req.body.descripcion + "\n" + "Tag: " + req.body.tags);
    con.query("SELECT nombre from tags WHERE nombre = " + "'" + req.body.tags + "'"), function (err, res) {
        console.log("si");
    };
    con.query("INSERT INTO `notas` (`fecha`, `titulo`, `descripcion`, `tag`) VALUES ( NOW(),'" + req.body.titulo + "', '" + req.body.descripcion + "','" + req.body.tags + "')")
})
app.listen(port, () => {
    console.log(`El servidor esta en el puerto ${port} `)
});
