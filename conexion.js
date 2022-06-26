var mysql      = require('mysql');
const { compileFunction } = require('vm');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'notas-db'
});

con.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack)    
      
    }
    else{
        console.log("se establecio la conexion")

    }
})
