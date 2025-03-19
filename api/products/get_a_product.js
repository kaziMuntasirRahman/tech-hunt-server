const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')

router.get('/products/:id', async (req, res) => {
  console.log('Get /products/:id api is being hit...')
  try {
    const { id } = req.params
    const { productCollection } = await connectDB()
    const result = await productCollection.findOne({ _id: new ObjectId(id) })
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error', error: err.message })
  } finally {
    return console.log('Get /products/:id request finished.')
  }
})

module.exports = router
