const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')

router.patch('/products/upvotes', async (req, res) => {
  console.log('Patch /products/upvotes api is being hit...')
  try {
    const { email, id } = req.query
    const { productCollection } = await connectDB()
    const findProduct = await productCollection.findOne({
      _id: new ObjectId(id)
    })
    // console.log('Find Product : ', findProduct)
    if (!findProduct) {
      return res.status(400).send({ message: 'Bad Request' })
    }
    const isUpvoted = findProduct.upvotes.includes(email.toLocaleLowerCase())

    if (!isUpvoted) {
      findProduct.upvotes.push(email)
      const updatedUpvote = findProduct.upvotes
      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            upvotes: updatedUpvote
          }
        }
      )
      return res.status(200).send({ message: 'upvoted', upvoted: true, result })
    } else {
      const updatedUpvote = findProduct.upvotes.filter(mail => mail !== email)
      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            upvotes: updatedUpvote
          }
        }
      )
      return res
        .status(200)
        .send({ message: 'un upvoted', upvoted: false, result })
    }
  } catch (err) {
    return res.status(500).send({ message: 'Server Error', error: err.message })
  } finally {
    console.log('Patch /products/upvotes request finished.')
  }
})

module.exports = router
