const express = require('express');
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.post('/users', async (req, res) => {
  console.log("Post /users api is being hit...")
  try {
    const newUser = req.body;
    if (!newUser.email) {
      return res.status(400).send({ message: "Bad Request" })
    }
    newUser.createdAt = new Date()
    newUser.email = newUser.email.toLowerCase()
    newUser.isSubscribed = false
    newUser.status = 'general'
    const { userCollection } = await connectDB()
    const result = await userCollection.insertOne(newUser)
    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: "Server Error!", error: err.message })
  } finally {
    console.log("Post /users request finished.")
  }
})

module.exports = router