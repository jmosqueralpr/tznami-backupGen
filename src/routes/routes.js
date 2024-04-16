//ROUTES

const express = require('express');
const routesApp = express();

routesApp.get("/UserName",(req, res)=>{
    console.log(req.body);
    res.send("profile page");
});

//LOGIN
const users = [{
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
},]
    
let userGlobal;

routesApp.post("/login",(req, res)=>{
    let verifyUser =  false;
    console.log(req.body);
     users.forEach( user =>{
        console.log(user);
        if (req.body.username === user.user && req.body.password === user.password) {
            verifyUser = true;
            console.log("Verify ok");
            userGlobal = user.user;
        }; 
       
    });
    if (verifyUser == true) {
        console.log("Entra?");
        res.send(true);
    } else {
        res.send(false);
    }; 
    
});

//Exportar el modulo de node
module.exports = routesApp; 



//GUARDANDO LOS ARCHIVOS

//Para acceder a datos del cuerpo de la solicitud post.
const bodyParser = require('body-parser');
//Para manejar la carga de archivos en aplicaciones web
const multer = require('multer');
//Para resolver rutas de archivos.
const path = require('path');
//Para manejo del file system
const fs = require('fs');

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
                            String(userGlobal);
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
  routesApp.post(`/upload`, upload.array('files'), (req, res) => {
      // Si estás enviando solo un archivo, puedes acceder a él a través de req.file
      const files = req.files;
      console.log(req.query);
      console.log(req.query.destiny);
      console.log(req.query.folder);
      console.log(files); // Aquí puedes ver los detalles del archivo enviado
  
      // Si estás enviando otros campos además del archivo, puedes acceder a ellos a través de req.body
      const formData = req.body;
      console.log(formData); // Aquí puedes ver los otros campos enviados
  
      res.status(200).send('Solicitud recibida correctamente.');
  });