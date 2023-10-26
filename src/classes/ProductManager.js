
import fs from 'fs'


class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.autoIncrementId = 1;
    }

    addProduct(title, description, price, category, status, thumbnails, code, stock) {
        
        if (!title || !description || !price || !category || !thumbnails || !code || stock === undefined) {
        console.log("Todos los campos son obligatorios.");
        return;
        }
        
        if (this.products.some((product) => product.code === code)) {
            console.log(`El producto con código ${code} ya existe.`);
            return;
        }

        const newProduct = {
            id: this.autoIncrementId++,
            title,
            description,
            price,
            category,
            status: true,
            thumbnails,
            code,
            stock,
            quantity: 1
        };
        
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const productsFromFile = JSON.parse(data);
            const newAddProduct = [...productsFromFile, newProduct];
            this.products.push(newAddProduct)
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
            
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
        }
    }
    
    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const productsFromFile = JSON.parse(data);
            return productsFromFile;
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    }  
    getProductById(id) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            const productsFromFile = JSON.parse(data);

            const product = productsFromFile.find((product) => product.id === id);
            if (!product) {
            console.log(`Producto con id:${id} no encontrado.`);
            }
            return product;
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return null;
        }
    }
    updateProduct(id, updatedFields) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            let productsFromFile = JSON.parse(data);
            
            const productIndex = productsFromFile.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                console.log("Producto no encontrado.");
                return;
            }
            updatedFields.id = id;

            productsFromFile[productIndex] = {
                ...productsFromFile[productIndex],
                ...updatedFields,
            };
            
            fs.writeFileSync(this.path, JSON.stringify(productsFromFile, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
        }
    }
    deleteProduct(id) {
        
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            let productsFromFile = JSON.parse(data);
            
            const productIndex = productsFromFile.findIndex((product) => product.id === id);
            if (productIndex === -1) {
            console.log("Producto no encontrado.");
            return;
            }
            
            productsFromFile.splice(productIndex, 1);
            
            fs.writeFileSync(this.path, JSON.stringify(productsFromFile, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error al leer o escribir en el archivo:", error);
        }
    }
}

const productManager = new ProductManager('../products.json');

export default productManager;

