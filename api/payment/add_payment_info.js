const express = require('express')
const connectDB = require('../../db/mongo_client')
const router = express.Router()

router.post('/payments', async (req, res) => {
  console.log('post /payments api is being hit...')
  try {
    const paymentInfo = req.body
    console.log(req.body)
    console.log(paymentInfo)
    if (!paymentInfo.email || !paymentInfo.payment_id || !paymentInfo.amount) {
      return res.status(400).send({ message: 'Forbidden' })
    }
    const { paymentCollection, userCollection } = await connectDB()
    const user = await userCollection.findOne({ email: paymentInfo.email })
    if (!user) {
      return res.status(400).send({ message: 'Forbidden' })
    }

    const user_db_result = await userCollection.updateOne({email: paymentInfo.email}, {$set: {hasPaidSubscription: 'pending'}})

    const date = new Date()
    paymentInfo.date = date
    paymentInfo.status = 'pending'

    const result = await paymentCollection.insertOne(paymentInfo)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('post /payments request finished')
  }
})

module.exports = router
