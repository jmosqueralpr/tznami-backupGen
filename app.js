//BackupGEN 
//

const express = require('express');
const morgan = require('morgan');
const settingsApp = require('./src/settings/settings');
const routesApp = require('./src/routes/routes');
const middlewareApp = require('./src/middleware/middlewares');


const app = express();

//1ero settings
app.use(settingsApp);

//2do middleware
app.use(middlewareApp);

//ROUTES MODULE
app.use(routesApp);




console.log(settingsApp.settings.port);
app.listen(settingsApp.settings.port);

console.log(`Server on port ${settingsApp.settings.port}`);