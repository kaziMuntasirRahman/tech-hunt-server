const express = require('express');
const router = express.Router()
const connectDB = require('../../db/mongo_client');
const { ObjectId } = require('mongodb');

router.delete('/products/reviews/:id', async (req, res)=>{
  console.log("delete /products/reviews/:id api is being hit...")
  try{
    const {id} = req.params;
    const {index} = req.query;
    if(index===undefined){
      return res.status(400).send({message: "Bad Request"})
    }
    console.log(id, index)
    const query = {_id: new ObjectId(id)}
    const {productCollection} = await connectDB()
    const product = await productCollection.findOne(query)
    if(!product){
      return res.status(400).send({message: "Bad Request"})
    }
    // console.log(product)
    product.reviews.splice(parseInt(index),1)
    const result = await productCollection.updateOne(query, {$set: {
      reviews: product.reviews
    }})
    return res.status(200).send(result)
  }catch(err){
    return res.status(500).send({message:"Server Error", error: err.message})
  }finally{
    console.log("Delete /products/reviews/:id request finished")
  }
})

module.exports = router