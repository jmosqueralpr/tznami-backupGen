//ROUTES

const express = require('express');
const routesApp = express();
const routesLogin = require('./routesLogin');

routesApp.use(routesLogin);

// Middleware para verificar la sesión
function verifySession(req, res, next) {
  if (global.verifyUser === true) {
    next(); // La sesión es válida, continuar al siguiente middleware
  } else {
    res.status(403).send('Usuario no verificado, volver a iniciar sesión.');
  }
}

//GUARDANDO LOS ARCHIVOS

//Para acceder a datos del cuerpo de la solicitud post.
const bodyParser = require('body-parser');
//Para manejar la carga de archivos en aplicaciones web
const multer = require('multer');
//Para resolver rutas de archivos.
const path = require('path');
//Para manejo del file system
const fs = require('fs');
//Para enviar los archivos a dropbox.
const { Dropbox } = require('dropbox');
const { nextTick } = require('process');

// Configurar multer para manejar los archivos recibidos en la solicitud
const storage = multer.diskStorage({

    
     destination: function (req, file, cb) {

       


      // Obtener la fecha actual
      const today = new Date();
      var destiny = req.query.destiny;
      var folder = req.query.folder;

      // Formatear la fecha en el formato deseado: YYYYMMDD
      const formattedDate = today.getFullYear() + 
                            String(today.getMonth() + 1).padStart(2, '0') + 
                            String(today.getDate()).padStart(2, '0') +
                            String(global.userGlobal);
      // Directorio donde deseas guardar los archivos con la fecha actual
      const uploadDir = path.join(`uploads/${destiny}/${folder}`, formattedDate);
      // Crear el directorio si no existe
      fs.mkdirSync(uploadDir, { recursive: true });
      // Indicar multer que el directorio de destino es el creado
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Aquí se define cómo se guardará el archivo con su nombre original y extensión
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Configurar bodyParser para analizar los cuerpos de las solicitudes
  routesApp.use(bodyParser.urlencoded({ extended: false }));
  routesApp.use(bodyParser.json());
  
  
  // Ruta para manejar las solicitudes de subida de archivos
  routesApp.post(`/upload`, verifySession, upload.array('files'), (req, res) => {
      
      // Si estás enviando solo un archivo, puedes acceder a él a través de req.file
      const files = req.files;
      console.log(req.query);
      console.log(req.query.destiny);
      console.log(req.query.folder);
      console.log(files); // Aquí puedes ver los detalles del archivo enviado

      
  
      // Si estás enviando otros campos además del archivo, puedes acceder a ellos a través de req.body
      if (global.verifyUser == true){
        const formData = req.body;
        console.log(formData); // Aquí puedes ver los otros campos enviados
        console.log(`global.verifyUser TRUE!`);
        res.status(200).send('Solicitud recibida correctamente.');
        
        } else {
          console.log("global.verifyUser FALSE"); 
          res.status(200).send('Usuario no verificado, volver a iniciar sesión.');

        }
  });

  //Exportar el modulo de node
module.exports = routesApp; 