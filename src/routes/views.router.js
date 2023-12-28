const { Router } = require('express');
const { ProductMongo } = require('../daos/mongo/products.daoMongo');
const router = Router();

const productsMongo = new ProductMongo();

router.get('/', async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price)
  })
  res.render('index', {
    title: 'Inicio',
    product,
  });
});

router.get('/products', async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach(prd => {
    prd.price = new Intl.NumberFormat('es-ES', {style: 'decimal'}).format(prd.price)
  })
  res.render('Products', {
    title: 'Productos',
    product,
    scriptView:'./js/index.js'
  });
})

router.get('/chat', async (req, res) => {
  res.render('chat')
})

exports.viewsRouter = router;
