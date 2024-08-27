const express = require('express');
const router = express.Router();
const {displayProducts} = require('../controllers/ProdController');
const { AddCartRemove, history } = require('../controllers/cartController');
router.post('/cart/:cartId',AddCartRemove)

router.post('/history/:userId',history)
module.exports = router;