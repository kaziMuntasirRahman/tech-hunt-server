const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/db')

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
const getAllUser = require('./api/user/get_all_user')
const getAllProduct = require('./api/products/get_all_products')


// call the api
app.use('/', getAllUser)
app.use('/', getAllProduct)

// TODO: hit those api
app.listen(port, () => {
  console.log('This server is running in the port no: ', port)
})
