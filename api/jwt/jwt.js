const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/jwt', async (req, res) => {
  try {
    const user = req.body
    console.log('JWT Generation Debug:')
    console.log('User data received:', user)
    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
    
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    
    console.log('Token generated successfully')
    res.send({ token })
  } catch (error) {
    console.error('JWT Generation Error:', error)
    res.status(500).send({ error: error.message })
  }
})

module.exports = router