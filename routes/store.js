
const {getAllproducts , getAllproductsStatic} = require('../controllers/products.js')
const express = require('express');
const router = express.Router();


router.route('/').get(getAllproducts)
router.route('/static').get(getAllproductsStatic)

module.exports = router;


// import { getAllproducts, getAllproductsStatic } from '../controllers/products.js';
// import express from 'express'
