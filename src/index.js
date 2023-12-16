
import express from "express";
import http from "http";
import morgan from "morgan";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT || 3000;

const app = express();
app.use(logger('dev'));

const server =  createServer(app);

const io = new Server(server);

app.get("/", (req,res) => {
    res.send("Welcome :)");
})



app.post('/login', (req,res) => {
 
})

function tokencheck(req,res,next){
    const acceskey = req.header('Authorization');

    if (acceskey == '123456') {
       res.send("Tu si tienes acceso :)")
    }else{
        res.status(401).json({error:'acceso denegado'})
    }

    try {
        res.send("Acceso Concedido")
    } catch (error) {
        console.log("Ocurrio un error :( ", error);
        res.statrus(401);
    }
}

app.get('/usereg/:id/:mail/:token', (req,res) => {
    const user = req.params.id;
    const gmail = req.params.mail;
    const token = req.params.token;
    try {
        res.send('user' + user + gmail + token);
        
    } catch (error) {
        res.status(404)
        console.log("Error: ", error)
    }
})

app.get("/usebr",tokencheck, (req,res) => {
    res.send("Bienvenido")

})

io.on('connection', (socket) => {
    console.log("Usuario conectado");

    socket.on('mensaje',(data, targetUID ) =>{

        io.to(targetUID).emit(data, {senderID:socket.id,data});
        console.log("Mensaje del cliente:", data);
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnect')
    })

})

server.listen(port,() =>{
    console.log("Servidor en marcha...")
})