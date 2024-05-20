const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Dropbox } = require('dropbox');

const routesApp = express();
routesApp.use(bodyParser.urlencoded({ extended: false }));
routesApp.use(bodyParser.json());

// Middleware para verificar la sesión
function verifySession(req, res, next) {
  if (global.verifyUser === true) {
    next(); // La sesión es válida, continuar al siguiente middleware
  } else {
    res.status(403).send('Usuario no verificado, volver a iniciar sesión.');
  }
}

// Definir usuarios para el login
const users = [
  {
    user: 'jmosquera',
    password: 'javierm',
    level: 2
  },
  {
    user: 'admin',
    password: 'administrador',
    level: 1
  },
  {
    user: 'bsoria',
    password: 'brendas',
    level: 1
  },
  {
    user: 'usuario',
    password: 'contraseña',
    level: 2
  },
  {
    user: '1',
    password: '1',
    level: 2
  }
];



// Ruta para el login
routesApp.post("/login", (req, res) => {
  let verifyUser = false;
  console.log(req.body);
  users.forEach(user => {
    console.log(user);
    if (req.body.username === user.user && req.body.password === user.password) {
      verifyUser = true;
      console.log("Verify ok");
      global.userGlobal = user.user;
    };
  });
  if (verifyUser == true) {
    console.log("Entra?");
    res.send(true);
  } else {
    res.send(false);
  };
});

// Configurar multer para manejar los archivos recibidos en la solicitud
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const today = new Date();
    const destiny = req.query.destiny;
    const folder = req.query.folder;
    const formattedDate = today.getFullYear() +
                          String(today.getMonth() + 1).padStart(2, '0') +
                          String(today.getDate()).padStart(2, '0') +
                          String(global.userGlobal);
    const uploadDir = path.join(`uploads/${destiny}/${folder}`, formattedDate);
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ruta para manejar las solicitudes de subida de archivos a Dropbox
routesApp.post(`/upload`, verifySession, upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    const { destiny, folder } = req.query;
    console.log(req.query);
    console.log(req.query.destiny);
    console.log(req.query.folder);
    console.log(files);

    const today = new Date();
    const formattedDate = today.getFullYear() +
                          String(today.getMonth() + 1).padStart(2, '0') +
                          String(today.getDate()).padStart(2, '0') +
                          today.toLocaleString('default', { month: 'long' });
    
    //TOKEN DE DROPBOX, no esta el token de dropbox porque para subir a git hay que eliminarlo. Ver el token en el Bitwarden de EYC 
    const dbx = new Dropbox({ accessToken: '' });

    for (const file of files) {
      const fileContents = fs.readFileSync(file.path);
      const dropboxFilePath = `/${destiny}/${folder}/${formattedDate}/${file.originalname}`;
      await dbx.filesUpload({ path: dropboxFilePath, contents: fileContents });
    }

    res.status(200).send('Archivos subidos correctamente a Dropbox.');
  } catch (error) {
    console.error('Error al subir archivos a Dropbox:', error);
    res.status(500).send('Error al subir archivos a Dropbox.');
  }
});

module.exports = routesApp;
