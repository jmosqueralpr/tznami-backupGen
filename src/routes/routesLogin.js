//LOGIN

const express = require('express');
const loginApp = express();



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
    


loginApp.post("/login",(req, res)=>{
    let verifyUser =  false;
    console.log(req.body);
     users.forEach( user =>{
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

module.exports = loginApp; 