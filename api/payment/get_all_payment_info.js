const express = require('express')
const connectDB = require('../../db/mongo_client')
const router = express.Router()

router.get('/payments', async (req, res) => {
  console.log('get /payments api is being hit...')
  try {
    const { paymentCollection } = await connectDB()
    const result = await paymentCollection.find().toArray()
    // console.log(result)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('get /payments request finished.')
  }
})

module.exports = router
