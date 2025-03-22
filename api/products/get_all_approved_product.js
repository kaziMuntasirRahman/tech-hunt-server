const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.get('/products/approved', async (req, res) => {
  console.log('get /products/approved api is being hit...')
  try {
    const { productCollection } = await connectDB()
    const result = await productCollection.find({status: 'approved'}).toArray()
    res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('get /products/approved request finished.')
  }
})

module.exports = router