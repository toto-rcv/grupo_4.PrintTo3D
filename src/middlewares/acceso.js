const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        
module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.userLogged = false;
    if(req.session.userLogged){
        res.locals.userLogged = req.session.userLogged;
    }else if(req.cookies.userEmail){
        let useraux = users.find(usuario => usuario.email == req.cookies.userEmail)
        let usuario = {...useraux}
        delete usuario.password;
        req.session.userLogged = usuario;
        res.locals.userLogged = usuario;
    }
    next();

}
