import express from 'express'; //servidor de la api rest
import morgan from 'morgan'; //muestra por consola la solicitud de los clientes

const app = express(); //crea el servidor de la api rest

app.set('port', 3000); //es el puerto para escuchar las solicitudes

app.use(morgan('dev'));//para ver solictud de los clientes
app.use(express.json());//metodo que permite interpretar objetos json de las solicitudes que se envian

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);//muestra por consola que se va a estar escuchando en puerto 3000
})