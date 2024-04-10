//SETTINGS

const express = require('express');
const settingsApp = express();

settingsApp.set('appName', 'tznami-backupGen');
settingsApp.set('port', 3000);

//Exportar el modulo de node
module.exports = settingsApp; 