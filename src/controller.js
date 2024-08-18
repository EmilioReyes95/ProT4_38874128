//aca se va a ir poniendo las funcionalidades, consultas en este caso a la base de dato, que va a realizar nuestro programa
//se trae el pool generado en database: el pool habilita conexiones paralelas o concurrentes
import {pool} from './database.js';

//se crea clase librocontroller con funcionalidades CRUD para traer lo que tengamos en BD

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getById(req, res) {
    const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);

        if (result.length > 0) {
            res.json(result[0]);  // Devuelve el libro encontrado
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    }


async add(req, res) {
    try {
        const { nombre, autor, categoria, anio_publicacion, isbn } = req.body;

        // Para ver si existen atributos extra no validos 
        const validAttributes = ['nombre', 'autor', 'categoria', 'anio_publicacion', 'isbn'];
        const receivedAttributes = Object.keys(req.body);

        const invalidAttributes = receivedAttributes.filter(attr => !validAttributes.includes(attr));
        if (invalidAttributes.length > 0) {
            return res.status(400).json({ error: `Atributos no válidos: ${invalidAttributes.join(', ')}` });
        }

        // Si todo esta ok agrega  el libro
        const [result] = await pool.query(
            `INSERT INTO libros(nombre, autor, categoria, anio_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`,
            [nombre, autor, categoria, anio_publicacion, isbn]
        );
        res.json({ "Id insertado": result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el libro', error });
    }
}

async delete(req, res) {
    const libro =  req.body;
    const [result] = await pool.query(`DELETE FROM libros WHERE  id=(?)`, [libro.id]);
    res.json({"Libro eliminado": result.affectedRows});

}

/*async update(req, res) {
    try {
        const { id, nombre, autor, categoria, anio_publicacion, isbn } = req.body;

        // Verifica si el libro existe antes de intentar actualizarlo
        const [existingBook] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
        if (existingBook.length === 0) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        // Actualiza el libro si se encuentra
        const [result] = await pool.query(
            `UPDATE libros SET nombre = ?, autor = ?, categoria = ?, anio_publicacion = ?, isbn = ? WHERE id = ?`,
            [nombre, autor, categoria, anio_publicacion, isbn, id]
        );
        res.json({ "Registros actualizados": result.changedRows });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
}*/


async update(req, res){
    const libro =  req.body;
    const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?),isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn, libro.id]);
    res.json({"Registros actualizados": result.changedRows});
}

}


//con async (anteriormente al nombre del metodo) y await (en la consulta a la bd que no queremos en stand by) nuestro servidor puede recibir varias consultas 

// se crea una constante para exportar y que sea visible en otros archivos del proyecto

export const libro = new LibroController(); //se crea constante "libro" que va a ser constante en otros archivos del proyecto
