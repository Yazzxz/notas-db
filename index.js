var mysql = require('mysql');
const { compileFunction } = require('vm');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notas-db'
});

const port = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const conexion = require("./conexion")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.set('views', __dirname + '/views')
app.use(express.static('estilos'))


app.get('/', (req, res) => {
    con.query("SELECT titulo,descripcion,id FROM nota", function(err, resp, fld){
        res.render("home", {dato : "datos para imprimir", usuarios : resp})
    }
)
});

app.get('/respuesta', (req, res) => {
        res.render("crear")
    })

app.post('/subido', (req, res) => {
    con.query("SELECT nombre FROM tag", function(err,res,fld){
        let esta = 0
        res.forEach(resultado => {
            if(resultado.nombre == req.body.tags){
                esta = 1
            }

        });
        console.log("Esta es igual a "+ esta)
        if(esta > 0){
            con.query("INSERT INTO `nota` (`fecha`, `titulo`, `descripcion`, `tag`) VALUES ( NOW(),'" + req.body.titulo + "', '" + req.body.descripcion + "','" + req.body.tags + "')")
        }
        if(esta == 0){
            con.query("INSERT INTO `tag` (`nombre`) VALUE ('" + req.body.tags + "')")
            con.query("INSERT INTO `nota` (`fecha`, `titulo`, `descripcion`, `tag`) VALUES ( NOW(),'" + req.body.titulo + "', '" + req.body.descripcion + "','" + req.body.tags + "')")         
        }
    })
    res.render("subido" , {estado : "cargado"})
    })

app.get("/borrado/:id", (req, res) =>{
    const id = req.params.id;
    console.log(id)
    con.query("DELETE FROM nota WHERE id = ?",[id],function (err,resp) {
        res.render("subido", {estado : "borrado"})
    })
})


app.get('/leer/:id', (req, res) => {
    //console.log("parametros son " + req.params.id)
    const id = req.params.id;
    console.log("id es " + id)
    con.query('SELECT titulo,descripcion,id FROM nota WHERE id = ?',[id],function(err,resp){
        res.render("lectura", {nota : resp[0]})
    })
    })


app.listen(port, () => {
    console.log(`El servidor esta en el puerto ${port} `)
});

app.use((req, res) => {
    res.status(404).render("404")
    })