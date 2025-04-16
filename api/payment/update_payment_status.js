const express = require('express')
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')
const router = express.Router()

router.patch('/payments', async (req, res) => {
  console.log('patch /payments api is being hit...')
  try {
    const { status, _id, email } = req.body
    console.log(status, _id)

    if (!status === 'accepted' && !status === 'rejected') {
      return res.status(400).send({ message: 'Wrong Status' })
    }

    const { paymentCollection, userCollection } = await connectDB()
    const paymentResponse = await paymentCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          status
        }
      },
      { upsert: true }
    )

    const result = await userCollection.updateOne(
      {email},
      {
        $set: {
          hasPaidSubscription: status === 'accepted'
        }
      },
      {
        upsert: true
      }
    )

    return res.status(200).send({result, paymentResponse})
  } catch (error) {
    console.log(error)
    return res.status(500).send('Server Error...')
  }
})

module.exports = router
