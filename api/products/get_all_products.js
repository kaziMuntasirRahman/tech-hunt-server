const express = require('express');
const router = express.Router()
const connectDB = require('../../db/db')

router.get('/products', async (req, res)=>{
  console.log("Get /products api is hit...")
  const {productCollection} = await connectDB()
  const result = await productCollection.find().toArray()
  res.send(result)
})

module.exports = router