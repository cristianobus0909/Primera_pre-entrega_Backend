import express from 'express';
import routerCarts from './routes/carts.js';
import routerProducts from './routes/products.js';
import usersRouter from './routes/users.js';
import routerViews from './routes/views.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';


const app = express();
const puerto = 8080;
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'handlebars');

app.use('/static', express.static(__dirname + '/public'));
app.use('/', routerViews);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/users', usersRouter);


const url = 'mongodb+srv://clbcristian:tpeyLRnudLy27oi2@cluster0.jpsemmz.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {dbName: 'admnin'})
    .then(()=>{
        console.log('Db connectado !!');
        app.listen(puerto, () => {
            console.log(`Servidor activo en puerto: ${puerto}`);
        });
    })
    .catch(e=>{
        console.error('Error conectando la Bd')
    });


socketServer.on('connection', socket =>{
    console.log('Nuevo cliente conectado')
    socket.on('message', data=>{
        console.log(data)
    })
});
