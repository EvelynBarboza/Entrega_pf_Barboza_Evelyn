const fs = require('fs')

 class ProductManager {
    constructor() {
          this.products =  [];
          this.id = 1;
          this.filePath = "products.json"
          
        }
    
 //añadir products       
     async addProduct (title, description, price, thumbnail, code, stock) {
            try {
                if (!title || !description || !price || !thumbnail || !code || !stock) {
                    throw new Error('Faltan campos obligatorios');

            }
            const existCode = this.products.some(product => product.code === code);
             if (existCode) {
                throw new Error ('Este codigo ya existe');
        } 

        const newProduct = {
            id: this.id++,
            title, 
            description, 
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        await this.saveProducts(this.products);

        } catch(error) {
            console.error('Error al agregar el producto')
            throw error;
        }
        
}
//array con productos cargados
    async getProducts () {
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error al obtener productos');
                    throw err;
                }
                return data;
            });
         return JSON.parse(data);
        } catch (error) {
            console.error('Error al obtener los productos');
            throw error;
        }
    }
//array con prod por id
    async getProductById (id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === parseInt(id));
        
        } catch (error){
            console.error('Error al obtener el producto por ID');
            throw error;
            }
        };
//actualizacion de product
    async upDateProduct (id, newData) {
    try {
        let products = await this.getProducts();
        const index = products.findIndex(product => product.id === parseInt(id));
        if (index !== -1) {
            products[index] = {...products[index], ...newData};
            await this.saveProducts(products);
        }else {
            throw new Error('Producto no encontrado');
        }

    } catch (error) {
        console.error('Error al actualizar el producto')
    } throw error;
    }
//eliminar product
    async deleteProduct(id){
        try {
            let products = await this.getProducts();
            products = products.filter(product => product.id !== id);
            await this.saveProducts(products);
            return;
        } catch (error) {
            console.error('Error al eliminar el producto');
            throw error;
        }
    }
//guardar productos
    async saveProducts(products) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error){
            console.error('Error al guardar los productos');
            throw error;
        }
    }
};

module.exports = ProductManager;