const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')

router.patch('/products/reviews/:id', async (req, res) => {
  console.log('Patch /products/reviews/:id api is being hit...')
  try {
    const { id } = req.params
    const {
      reviewerName,
      reviewerEmail,
      reviewerImage = null,
      reviewDescription = null,
      rating
    } = req.body
    if (!reviewerEmail || !reviewerName || !rating) {
      return res.status(400).send({ message: 'Bad Request' })
    }
    const postedDate = new Date()
    const newReview = {
      reviewerEmail,
      reviewerName,
      reviewerImage,
      reviewDescription,
      rating,
      postedDate
    }
    // console.log(newReview)
    const query = { _id: new ObjectId(id) }
    const { productCollection } = await connectDB()
    const product = await productCollection.findOne(query)
    if (!product.name) {
      return res.status(400).send({ message: "Couldn't find the product" })
    }
    const isAlreadyReviewed = product.reviews.find(review=>review.reviewerEmail===reviewerEmail)
    if(isAlreadyReviewed){
      const message = "User already reviewed this product."
      console.log(message)
      return res.status(409).send(message)
    }

    product.reviews.push(newReview)

    const result = await productCollection.updateOne(
      query,
      { $set: { reviews: product.reviews } },
      { upsert: true }
    )
    return res.status(200).send(result)
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Server Error', error: err.message })
  } finally {
    console.log('Patch /products/reviews/:id request finished.')
  }
})

module.exports = router
