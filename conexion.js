var mysql      = require('mysql');
const { compileFunction } = require('vm');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'notas'
});

con.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack)    
      
    }
    else{
        console.log("se establecio la coneccion")

    }
})

con.query("INSERT INTO `notas` (`fecha`, `titulo`, `descripcion`, `tag`) VALUES ( NOW(), 'colegio', 'hay tarea?\r\n-preguntar si hay tarea', 'importante')")