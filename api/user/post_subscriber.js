const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.patch('/users/subscribers/:email', async (req, res) => {
  console.log('Post users/subscribers/:email api is being hit...')
  try {
    const { email } = req.params
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9{2,}$]/

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ message: 'Expecting a valid email address as params.' })
    }

    const { userCollection } = await connectDB()

    const userInfo = await userCollection.findOne({ email })
    if (userInfo.isSubscribed) {
      return res.status(200).send({ message: 'User is already a subscriber.' })
    }

    const result = await userCollection.updateOne(
      { email },
      { $set: { isSubscribed: true } },
      { upsert: true }
    )
    return res.status(200).send(result)
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Internal Server Error', error: err.message })
  } finally {
    console.log('Post users/subscribers/:email request finished.')
  }
})

module.exports = router
