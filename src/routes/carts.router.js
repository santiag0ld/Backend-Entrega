const { Router } = require('express');
const CartsManager = require('../managers/cartManager.js');
const cartsService = new CartsManager('./src/data/carts.json');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const allCarts = await cartsService.getCart();
    res.json({
      status: 'success',
      payload: allCarts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await cartsService.createCart();
    res.json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
    });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(parseInt(cid));
    if (typeof cart === 'string') {
      res.status(404).json({
        status: 'error',
        message: cart,
      });
    } else {
      res.json({
        status: 'success',
        payload: cart,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
    });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cartsService.addProductToCart(parseInt(cid), parseInt(pid));
    if (typeof result === 'string') {
      res.status(404).json({
        status: 'error',
        message: result,
      });
    } else {
      res.json({
        status: 'success',
        payload: result,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
    });
  }
});

module.exports = router;
