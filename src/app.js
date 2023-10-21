import express from 'express';
import routerCarts from './routes/carts.js';
import routerProducts from './routes/products.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars'

const app = express();
const puerto = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');
app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(puerto, () => {
    console.log(`Servidor activo en puerto: ${puerto}`);
});




