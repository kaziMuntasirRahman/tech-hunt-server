const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')

router.patch('/products/:id/featured', async (req, res) => {
  console.log('patch /products/:id/featured api is being hit...')
  try {
    const { id } = req.params
    console.log(id)
    const { productCollection } = await connectDB()
    const query = { _id: new ObjectId(id) }
    const product = await productCollection.findOne(query)
    if (!product.name) {
      return res.status(400).send({ message: "the product doesn't exist.", errorCode: "product_not_found" })
    }else if(product.status!=='approved'){
      return res.status(400).send({ message: "The Product hasn't been Approved Yet.", errorCode: "product_not_approved" })
    }

    // console.log(product)
    let newFeaturedStatus = true
    if (product.isFeatured === true) {
      newFeaturedStatus = false
    }
    // return res.send(newFeaturedStatus)
    const result = await productCollection.updateOne(
      query,
      { $set: { isFeatured: newFeaturedStatus } },
      { upsert: true }
    )
    res.status(200).send({ result, newFeaturedStatus })
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('patch /products/:id/featured request finished.')
  }
})

module.exports = router
