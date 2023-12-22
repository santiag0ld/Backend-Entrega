const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.readFromFile();
  }

  readFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log('Archivo no encontrado ' + this.path);
      this.products = [];
    }
  }

  writeToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(title, description, price, thumbnail, code, stock, status, category) {
    if (!title || !description || !price || !code || !stock || !status || !category) {
      console.log('Por favor, complete todos los campos.');
      return;
    }
    if (this.getProductByCode(code)) {
      console.log('Código de producto ya existente.');
      return;
    }
    const newId = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;

    const product = {
      id: newId,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };

    this.products.push(product);
    this.writeToFile();
    console.log('Producto agregado con éxito.');
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeToFile();
      return { success: true, message: `Producto con ID ${id} eliminado con éxito.` };
    } else {
      return { success: false, message: `No se encontró un producto con ID ${id}.` };
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      if (
        updatedProduct.title &&
        updatedProduct.description &&
        updatedProduct.price &&
        updatedProduct.code &&
        updatedProduct.stock
      ) {
        this.products[index] = {
          id: id,
          title: updatedProduct.title,
          description: updatedProduct.description,
          price: updatedProduct.price,
          thumbnail: updatedProduct.thumbnail,
          code: updatedProduct.code,
          stock: updatedProduct.stock,
        };

        this.writeToFile();
        console.log(`Producto con ID ${id} actualizado con éxito.`);
      } else {
        console.log('Por favor, complete todos los campos.');
      }
    } else {
      console.log(`No se encontró el producto con ID ${id}.`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getProductByCode(code) {
    return this.products.some((product) => product.code === code);
  }
}

module.exports = ProductManager;
