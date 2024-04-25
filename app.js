//BackupGEN 
//

const express = require('express');
const morgan = require('morgan');
const settingsApp = require('./src/settings/settings');
const loginApp = require('./src/routes/routesLogin');
//Acá voy a elegir entre routes y routesUploadLocal si necesito probar de forma local o con dropbox.
const routesApp = require('./src/routes/routesUploadLocal');
const middlewareApp = require('./src/middleware/middlewares');


const app = express();

//Declaración de una variable global.

global.userGlobal = '';

//1ero settings
app.use(settingsApp);

//2do middleware
app.use(middlewareApp);

//ROUTES

//Login module
app.use(loginApp);

//ROUTES MODULE
app.use(routesApp);




console.log(settingsApp.settings.port);
app.listen(settingsApp.settings.port);

console.log(`Server on port ${settingsApp.settings.port}`);