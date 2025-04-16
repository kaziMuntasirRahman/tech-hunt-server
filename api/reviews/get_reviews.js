const express = require('express');
const connectDB = require('../../db/mongo_client');
const router = express.Router();

router.get('/reviews', async (req, res) => {
  console.log('GET /reviews API is being hit...');
  try {
    const { productCollection } = await connectDB();

    // Step 1: Find products with at least one review
    const products = await productCollection
      .find(
        { $expr: { $gt: [{ $size: '$reviews' }, 0] } },
        { projection: { _id: 1, name: 1, reviews: 1 } }
      )
      .toArray();

    // Step 2: Shuffle the products
    const shuffledProducts = products.sort(() => 0.5 - Math.random());

    // Step 3: Pick 5 products and return one random review from each
    const result = shuffledProducts.slice(0, 10).map(product => {
      const randomReview = product.reviews[Math.floor(Math.random() * product.reviews.length)];
      return {
        _id: product._id,
        name: product.name,
        review: randomReview
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error in /reviews:', error);
    return res.status(500).send('Server Error...');
  }
});

module.exports = router;
