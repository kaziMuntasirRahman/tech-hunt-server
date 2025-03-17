const express = require('express')
const router = express.Router()
const connectDB = require('../../db/db')

router.get('/users', async (req, res) => {
  console.log("Get /users api is hit...")
  const { userCollection } = await connectDB()
  const result = await userCollection.find().toArray()
  res.send(result)
})

module.exports = router
