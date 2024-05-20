const express = require('express');
const inactivityTimeApp = express();

inactivityTimeApp.post("/inactivityTime",(req, res) => {
    console.log(req.body.message);
    global.verifyUser = false;
    res.json({
        status: 'Out of time',
        message: 'Se terminó el tiempo de sesión.'
    });
    console.log("Verify user");
    console.log(global.verifyUser);
});



module.exports = inactivityTimeApp;