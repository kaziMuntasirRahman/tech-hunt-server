const express = require('express')
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')
const router = express.Router()

router.patch('/products/:id', async (req, res) => {
  console.log('patch /products/:id api is being hit...')
  try {
    const updatedProduct = req.body
    console.log(updatedProduct)
    const { id } = req.params
    const { email } = req.decoded
    const query = { _id: new ObjectId(id) }
    const { productCollection } = await connectDB()
    const product = await productCollection.findOne(query)
    if (!product) {
      return res.status(404).send({ message: 'Not Found' })
    } else if (product.productOwner.email !== email) {
      return res.status(403).send({ message: 'Unauthorized' })
    }
    const result = await productCollection.updateOne(
      query,
      {
        $set: {
          name: updatedProduct.name || product.name,
          description: updatedProduct.description || product.description,
          image: updatedProduct.image || product.image,
          externalLinks: updatedProduct.externalLinks,
          tags: updatedProduct.tags
        }
      },
      { upsert: true }
    )

    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('patch /products/:id request finished.')
  }
})

module.exports = router
