const connectDb = require('./connectdb.js');
const Product = require('./model/product.js');
const productjson = require('./products.json')
require('dotenv').config();
// import connectDB from './connectdb.js';
// import Product from './model/product.js';
// import productsjson from './products.json'assert { type: 'json' };

const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URL)
        await Product.deleteMany();
        await Product.create(productjson);
        console.log('Done..');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();
