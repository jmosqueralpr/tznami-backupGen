//LOGIN

const express = require('express');
const loginApp = express();



const users = [{
    user: 'jmosquera',
    password: 'javierm',
    level: 2
},
{
    user: 'bsoria',
    password: 'bSoria238',
    level: 2
},
{
    user: 'asolver',
    password: 'alexS489',
    level: 2
},
{
    user: 'fscola',
    password: 'fedeS978',
    level: 1
},
{
    user: 'jtomatis',
    password: 'juanT983',
    level: 1
},
{
    user: 'ecaffa',
    password: 'enriqueC253',
    level: 1
},
{
    user: 'rrojas',
    password: 'ricardoR536',
    level: 1
},
{
    user: 'wspilere',
    password: 'willyS369',
    level: 1
},
{
    user: 'tmoren',
    password: 'tomasM5215',
    level: 1
},
{
    user: 'fmarino',
    password: 'fedeM987',
    level: 1
},
{
    user: 'gfranconeri',
    password: 'gianF587',
    level: 1
},
{
    user: 'ffreire',
    password: 'ferF512',
    level: 1
},
{
    user: 'wleguiza',
    password: 'walterL',
    level: 1
},
{
    user: 'mpardo',
    password: 'manuelP995',
    level: 1
},
{
    user: 'ldlpeña',
    password: 'luisdlP563',
    level: 1
},
{
    user: 'fsecul',
    password: 'fabioS563',
    level: 1
},
{
    user: 'cscrofani',
    password: 'christianS325',
    level: 1
},
{
    user: 'mescobar',
    password: 'mairaE278',
    level: 1
},
{
    user: 'balizador573',
    password: 'bal573',
    level: 1
},
{
    user: 'balizador574',
    password: 'bal574',
    level: 1
},
{
    user: 'balizadorBoyero',
    password: 'balBoyero',
    level: 1
},
{
    user: 'balizadorMula',
    password: 'balMula',
    level: 1
},
{
    user: 'lanchaCharrua',
    password: 'lanChar',
    level: 1
},
{
    user: 'lanchaDonOsvaldo',
    password: 'lanDonOsv',
    level: 1
},
{
    user: 'lanchaKawai',
    password: 'lanKawai',
    level: 1
},
{
    user: 'admin',
    password: 'administrador',
    level: 1
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