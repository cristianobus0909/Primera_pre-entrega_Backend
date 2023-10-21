import express from 'express'
import bodyParser from 'body-parser';
import CartManager from '../classes/cartManager.js';

const routerCarts = express.Router();

routerCarts.use(bodyParser.json());

routerCarts.post("/", (req, res) => {
    const newCartId = CartManager.createCart();
    res.json({ cartId: newCartId });
});


routerCarts.get("/:cid", (req, res) => {
    const cartId = req.params.cid;
    const cartProducts = CartManager.listCartProducts(cartId);
    res.json(cartProducts);
});


routerCarts.post("/:cid/product/:pid", (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;


    const result = CartManager.addProductToCart(cartId, productId, quantity);

    if (result) {
    res.json({ message: "Producto agregado al carrito" });
    } else {
    res.status(404).json({ error: "Carrito no encontrado" });
    }
});
export default routerCarts;
