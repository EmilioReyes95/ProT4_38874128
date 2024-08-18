//aca se va a ir poniendo las funcionalidades, consultas en este caso a la base de dato, que va a realizar nuestro programa
//se trae el pool generado en database: el pool habilita conexiones paralelas o concurrentes
import {pool} from './database.js';

//se crea clase librocontroller con funcionalidades CRUD para traer lo que tengamos en BD

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro =  req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria,anio_publicacion,isbn) VALUES (?,?,?,?,?)` , [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
}
}
//con async (anteriormente al nombre del metodo) y await (en la consulta a la bd que no queremos en stand by) nuestro servidor puede recibir varias consultas 

// se crea una constante para exportar y que sea visible en otros archivos del proyecto

export const libro = new LibroController(); //se crea constante "libro" que va a ser constante en otros archivos del proyecto
