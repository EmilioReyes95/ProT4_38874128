// se crea para establecer que ruta desde el servidor se utilizara para  acceder a los distintos metodos (por ej getAll)

import { Router } from 'express'; //permite implementar la funcionalidad mediante la clase Router de express
import { libro } from './controller.js'; //importamos el objeto que creamos

export const router = Router(); //donde se cargan las rutas

router.get('/libros', libro.getAll); //cuando usuario entra a servidor "libros" tiene acceso a todos los elementos gracia a metodo "getAll"
