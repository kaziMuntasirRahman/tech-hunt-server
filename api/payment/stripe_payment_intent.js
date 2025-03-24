const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/create-payment-intent', async (req, res) => {
  console.log('post /create-payment-intent api is being hit...')
  try {
    const { price } = req.body
    console.log('price:', price)
    const amount = parseInt(price * 100)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card']
    })
    console.log(paymentIntent.status, paymentIntent.id)  

    res.status(200).send({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('post /create-payment-intent request finished.')
  }
})

module.exports = router
