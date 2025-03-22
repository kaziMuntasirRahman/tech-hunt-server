const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/jwt', async (req, res) => {
  console.log('post /jwt api is being hit...')
  try {
    const user = req.body
    if (!user.email) {
      return res.status(400).send({ message: 'Bad Request' })
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' })
    return res.status(200).send({ token })
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('...')
  }
})

module.exports = router