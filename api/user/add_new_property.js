const express = require('express')
const connectDB = require('../../db/mongo_client')
const router = express.Router()

router.patch('/users/add-property', async (req, res) => {
  console.log('patch /users/add_property is being hit...')
  try {
    const { paymentCollection } = await connectDB()
    const result = await paymentCollection.updateMany({}, {$set: {status:'pending'}}, {upsert: true})
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: err.message })
  } finally {
    console.log('patch /users/add_property request finished.')
  }
})

module.exports = router