import path from 'path';
const fs = require('fs');


class CartManager {
    constructor(cartDataPath) {
    this.cartDataPath = cartDataPath;
    }

    createCart() {
        const cartId = generateUniqueId();
        const cartData = { id: cartId, products: [] };
        const cartDataFile = path.join(this.cartDataPath, `${cartId}.json`);
        fs.writeFileSync(cartDataFile, JSON.stringify(cartData), "utf8");
        return cartId;
    }

    listCartProducts(cartId) {
        const cartDataFile = path.join(this.cartDataPath, `${cartId}.json`);

        if (fs.existsSync(cartDataFile)) {
            const cartData = JSON.parse(fs.readFileSync(cartDataFile, "utf8"));
        return cartData.products;
        }

        return [];
    }

    addProductToCart(cartId, productId, quantity) {
        const cartDataFile = path.join(this.cartDataPath, `${cartId}.json`);

        if (fs.existsSync(cartDataFile)) {
            const cartData = JSON.parse(fs.readFileSync(cartDataFile, "utf8"));
            const existingProductIndex = cartData.products.findIndex(
            (product) => product.id === productId
            );
            if (existingProductIndex !== -1) {
                cartData.products[existingProductIndex].quantity += quantity;
            } else {
            
                cartData.products.push({ id: productId, quantity });
            }

            fs.writeFileSync(cartDataFile, JSON.stringify(cartData), "utf8");
            return true;
        }

        return false;
    }
}
const cartManager = new CartManager('../carts.json');

export default CartManager;
