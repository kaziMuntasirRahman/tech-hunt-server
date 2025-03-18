const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.get('/users/:email', async (req, res) => {
  console.log('Get /users/:email api is being hit...')
  try {
    const { email } = req.params
    const emailRegex = /^[a-zA-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9{2,}$]/
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ message: 'Expecting a valid email address' })
    }
    const { userCollection } = await connectDB()
    const result = await userCollection.findOne({email: email.toLowerCase()})
    res.status(200).send(result)
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Server Error!', error: err.message })
  } finally {
    console.log('Get /users/:email request finished.')
  }
})

module.exports = router