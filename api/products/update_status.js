const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')
const { ObjectId } = require('mongodb')
const verifyModerator = require('../../middlewares/verifyModerator')

router.patch('/products/:id/status', verifyModerator, async (req, res) => {
  console.log('patch /products/:id/status api is being hit...')
  try {
    const { id } = req.params
    if (!('status' in req.body)) {
      return res.status(400).send({ message: 'Bad Request.' })
    }
    const { status } = req.body

    const { productCollection } = await connectDB()
    const query = { _id: new ObjectId(id) }
    const product = await productCollection.findOne(query)

    if (!product.name) {
      return res.status(400).send({ message: "The Product doesn't Exist." })
    }

    let newStatus = 'rejected'
    if (status) {
      newStatus = 'approved'
    }

    const result = await productCollection.updateOne(
      query,
      { $set: { status: newStatus } },
      { upsert: true }
    )

    return res.status(200).send(result)
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('patch /products/:id/status request finished.')
  }
})

module.exports = router
