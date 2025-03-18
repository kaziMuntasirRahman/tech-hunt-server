const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.get('/products', async (req, res) => {
  console.log('Get /products api is being hit...')
  try {
    // TODO: make query for filtering every property
    const query = req.query || {}
    const { productCollection } = await connectDB()
    const result = await productCollection.find().toArray()
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ message: 'Server Error!', error: err.message })
  } finally {
    console.log('Get /products request finished.')
  }
})

module.exports = router
