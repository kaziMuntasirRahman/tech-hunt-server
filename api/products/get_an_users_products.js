const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.get('/products/users/:email', async (req, res) => {
  console.log('get /products/:email api is being hit')
  try {
    const { email } = req.params
    if (!email) {
      return res.status(400).send({ message: 'Bad Request' })
    }
    const emailRegex = /^[a-zA-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9{2,}$]/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ message: 'Expecting a valid Email Address' })
    }
    const { productCollection } = await connectDB()
    const result = productCollection.find({ 'productOwner.email': email }).toArray()
    res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error', error: err.message })
  } finally {
    console.log('get /products/:email request finished')
  }
})

module.exports = router