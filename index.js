const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongo_client')

const app = express()
const port = process.env.PORT

// //middlewares
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => {
  res.send('Tech Hunt server is running...')
})

connectDB()

// Import Routes
// products
const getAllProduct = require('./api/products/get_all_products')
const postMultipleProduct = require('./api/products/post_multiple_product')
// users
const postNewUser = require('./api/user/post_new_user')
const getAllUser = require('./api/user/get_all_user')
const getAnUser = require('./api/user/get_an_user')

// call the api
//products
app.use('/', getAllProduct)
app.use('/', postMultipleProduct)
// users
app.use('/', getAllUser)
app.use('/', postNewUser)
app.use('/', getAnUser)

// TODO: hit those api
app.listen(port, () => {
  console.log('This server is running in the port no:', port)
})
