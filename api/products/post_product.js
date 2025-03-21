const express = require('express')
const router = express.Router()
const connectDB = require('../../db/mongo_client')

router.post('/products', async (req, res) => {
  console.log('Post /products api is being hit...')
  try {
    const { productCollection } = await connectDB()
    const products = req.body
    console.log('point................1')
    //request body validation
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .send({ message: 'Invalid format. Expected an Array of Products.' })
    }
    console.log('point................2')
    const hasNameProperty = products.every(obj => obj.hasOwnProperty('name'))
    const hasDescriptionProperty = products.every(obj =>
      obj.hasOwnProperty('description')
    )
    const hasImageProperty = products.every(obj => obj.hasOwnProperty('image'))
    const hasTagsProperty = products.every(obj => obj.hasOwnProperty('tags'))
    const hasExternalLinksProperty = products.every(obj =>
      obj.hasOwnProperty('externalLinks')
    )
    const hasProductOwnerProperty = products.every(obj =>
      obj.hasOwnProperty('productOwner')
    )

    if (
      !hasNameProperty ||
      !hasDescriptionProperty ||
      !hasImageProperty ||
      !hasTagsProperty ||
      !hasExternalLinksProperty ||
      !hasProductOwnerProperty
    ) {
      return res
        .status(400)
        .send({ message: 'Missing one or multiple property.' })
    }
    console.log('point................3')

    const hasNameValue = products.every(obj => obj.name)
    const hasDescriptionValue = products.every(obj => obj.description)
    const hasImageValue = products.every(obj => obj.image)
    const hasTagsValue = products.every(obj => obj.tags.length >= 3)
    const hasLinksValue = products.every(obj => obj.externalLinks[0])
    const hasOwnerNameValue = products.every(obj => obj.productOwner.name)
    const hasEmailNameValue = products.every(obj => obj.productOwner.email)

    if (
      !hasNameValue ||
      !hasDescriptionValue ||
      !hasImageValue ||
      !hasTagsValue ||
      !hasLinksValue ||
      !hasOwnerNameValue ||
      !hasEmailNameValue
    ) {
      return res
        .status(400)
        .send({ message: 'Missing one or multiple value of some property.' })
    }
    console.log('point................4')

    const date = new Date()

    const newProducts = products.map(product => {
      return {
        name: product.name,
        description: product.description,
        image: product.image,
        externalLinks: product.externalLinks,
        tags: product.tags,
        productOwner: product.productOwner,
        isFeatured: false,
        upvotes: [],
        reports: [],
        reviews: [],
        status: 'pending',
        postedDate: date
      }
    })

    const result = await productCollection.insertMany(newProducts)
    return res.status(200).send(result)
    // return res.status(200).send({ message: 'ready to upload' })
  } catch (err) {
    return res
      .status(500)
      .send({ message: 'Server Error!', error: err.message })
  } finally {
    console.log('Post /products request finished...')
  }
})

module.exports = router
