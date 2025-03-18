const express = require('express');
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.post('/products', async (req,res)=>{
  console.log('Post /products api is being hit...')
  try{
    const {productCollection} = await connectDB()
    const products = req.body;
    //request body validation
    if(!Array.isArray(products)){
      res.status(400).send({message: "Invalid format. Expected an Array of Products."})
    }
    const result = await productCollection.insertMany(products)
    return res.status(200).send(result)
  }catch(err){
    return res.status(500).send({message: "Server Error!", error: err.message})
  }finally{
    console.log("Post /products request finished...")
  }
})

module.exports = router