import express from 'express';
import routerCarts from './routes/carts';
import routerProducts from './routes/products';
import __dirname from './utils';

const app = express();
const puerto = 8080;

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(puerto, () => {
    console.log(`Servidor activo en puerto: ${puerto}`);
});




