const express = require('express');
require('dotenv').config(); // dotenv doesn't need a file extension
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const db = require('./connectdb.js');
const router = require('./routes/store.js');
require('express-async-errors');
const cors = require('cors')
/*----------------------------------- */
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const dbconnection = process.env.MONGO_URL
const app = express();
app.use(express.json())
app.use(cors());
//routes
app.use(express.static('public'))
app.get('/' , (req,res)=>{
  res.send('<h1>Store API</h1><a href="/api/v1/products">Product</a>')
})
app.use('/api/v1/products',router)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
//products routes


const start = async () => {
  try {
    //connectDB
    await db(dbconnection)
    app.listen(port , console.log(`server is on port ${port}`))
  } catch (error) {
    console.log(error);
  }
}
start()