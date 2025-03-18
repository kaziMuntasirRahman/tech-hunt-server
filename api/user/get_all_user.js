const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.get('/users', async (req, res) => {
  console.log('Get /users api is being hit...')
  try {
    const { userCollection } = await connectDB()
    const result = await userCollection.find().toArray()
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server error', error: err.message })
  } finally {
    console.log('Get /users request finished')
  }
})

module.exports = router
