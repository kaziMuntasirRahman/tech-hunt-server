const express = require('express')
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')
const router = express.Router()

router.delete('/products/:id', async (req, res) => {
  console.log('delete /products/:id api is being hit...')
  try {
    const { id } = req.params
    const {email} = req.decoded;
    console.log(email)
    console.log(id)
    const query = {_id: new ObjectId(id)}
    const {productCollection} = await connectDB()
    const product = await productCollection.findOne(query)
    if(!product){
      return res.status(404).send({message: "Product doesn't exist."})
    }else if(email!==product.productOwner.email){
      return res.status(403).send({message: "Forbidden"})
    }
    const result = await productCollection.deleteOne(query)
    return res.status(200).send(result)

  } catch (err) {
    return res.status(500).send('Server Error')
  } finally {
    console.log('delete /products/:id request finished')
  }
})

module.exports = router