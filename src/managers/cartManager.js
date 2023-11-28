const fs = require('fs').promises;

class CartsManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getCartById(cid) {
    const carts = await this.readFile();
    const cart = carts.find((cart) => cart.id === cid);
    if (!cart) {
      return 'No se encuentra el carrito';
    }
    return cart;
  }

  async createCart() {
    const carts = await this.readFile();
    const newCart = { id: carts.length === 0 ? 1 : carts[carts.length - 1].id + 1, products: [] };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.readFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cid);

    if (cartIndex === -1) {
      return 'No se encuentra el carrito';
    }

    const productIndex = carts[cartIndex].products.findIndex((product) => product.productId === pid);

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity += 1;
    } else {
      carts[cartIndex].products.push({ productId: pid, quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    return carts[cartIndex];
  }
}

module.exports = CartsManager;
