//MIDDLEWARE MODULE

//Importo paquete express y morgan
const express = require ('express');
const morgan = require ('morgan');

//Imboco la funcion express que devuelve el objeto de aplicación express.
const middlewareApp = express();
//Uso esto para poder leer archivos json recibidos.
middlewareApp.use(express.json());
//Con esto comparto los archivos de la carpeta public cuando se conectan al puerto 3000.
middlewareApp.use(express.static('./public'));

//Uso morgan para ver datos de peticiones http que nos hayan realizado.
middlewareApp.use(morgan("dev"));

console.log("Middleware ejecutado");
/* hacer modulo para loggin */
module.exports = middlewareApp;