// se crea para establecer que ruta desde el servidor se utilizara para  acceder a los distintos metodos (por ej getAll)

import { Router } from 'express'; //permite implementar la funcionalidad mediante la clase Router de express
import { libro } from './controller.js'; //importamos el objeto que creamos

export const router = Router(); //donde se cargan las rutas

router.get('/libros', libro.getAll); //cuando cliente entra a servidor "libros" tiene acceso a todos los elementos gracia a metodo "getAll"
router.post('/libros', libro.add);//para agregar libro 
router.delete('/libros', libro.delete);//para eliminar libro
router.put('/libros', libro.update);// para actualizar 