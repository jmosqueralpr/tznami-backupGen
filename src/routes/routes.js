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
    user: 'usuario',
    password: 'contraseña',
    level: 2
},]
    

routesApp.post("/login",(req, res)=>{
    let verifyUser =  false;
    console.log(req.body);
     users.forEach( user =>{
        console.log(user);
        if (req.body.username === user.user && req.body.password === user.password) {
            verifyUser = true;
            console.log("Verify ok");
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