const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.patch('/users/profile/:email', async (req, res) => {
  console.log('patch /users/profile/:email api is being hit...')
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
    const { name, photoURL } = req.body
    if (!name || !photoURL) {
      res.status(400).send({ message: 'Bad Request' })
    }
    const { userCollection } = await connectDB()
    const result = await userCollection.updateOne(
      { email },
      {
        $set: {
          name,
          photoURL
        }
      },
      { upsert: true }
    )
    res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error.' })
  } finally {
    console.log('patch /users/profile/:email request finished')
  }
})

module.exports = router
