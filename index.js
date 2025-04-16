const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/mongo_client')

const app = express()
const port = process.env.PORT

// //middlewares
app.use(express.json())
//Must remove "/" from your production URL
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://tech-hunt0.web.app',
      'https://tech-hunt0.firebaseapp.com'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400 // 24 hours
  })
)

app.get('/', (_, res) => {
  res.send('Tech Hunt server is running...')
})

connectDB()

// Import Routes
// jwt
const jwt = require('./api/jwt/jwt')
//middlewares
const verifyToken = require('./middlewares/verifyToken')
const verifyAdmin = require('./middlewares/verifyAdmin')
const verifyModerator = require('./middlewares/verifyModerator')
// products
const getOneProduct = require('./api/products/get_a_product')
const getAllProduct = require('./api/products/get_all_products')
const getAllApprovedProduct = require('./api/products/get_all_approved_product')
const postMultipleProduct = require('./api/products/post_product')
const switchUpvote = require('./api/products/handle_upvote')
const postReview = require('./api/products/post_new_review')
const deleteReview = require('./api/products/delete_a_review')
const getUsersProducts = require('./api/products/get_an_users_products')
const switchFeaturedProduct = require('./api/products/switch_featured_product')
const updateProductStatus = require('./api/products/update_status')
const deleteProduct = require('./api/products/delete_a_product')
const updateAProduct = require('./api/products/update_a_product')
// users
const postNewUser = require('./api/user/post_new_user')
const getAllUser = require('./api/user/get_all_user')
const getAnUser = require('./api/user/get_an_user')
const postSubscriber = require('./api/user/post_subscriber')
const updateUserInfo = require('./api/user/update_profile_info')
const promoteToModerator = require('./api/user/promote_to_moderator')
const promoteToAdmin = require('./api/user/promote_to_admin')
const demoteToUser = require('./api/user/demote_to_user')
const addNewProperty = require('./api/user/add_new_property')
//payments
const payment = require('./api/payment/stripe_payment_intent')
const addPaymentInfo = require('./api/payment/add_payment_info')
const getAllPayments = require('./api/payment/get_all_payment_info')
const updatePaymentStatus = require('./api/payment/update_payment_status')
//reviews
const getAllReview = require('./api/reviews/get_reviews')

// call the APIs
//jwt
app.use('/', jwt)

// ---------- public routes -----------
//products
app.use('/', getAllApprovedProduct)
// users
app.use('/', postNewUser)
app.use('/', postSubscriber)
app.use('/', addNewProperty)
// reviews
app.use('/', getAllReview)

// ---------- Protected routes -----------
app.use('/', verifyToken)
// products
app.use('/', getOneProduct)
app.use('/', switchUpvote)
app.use('/', postReview)
app.use('/', getUsersProducts)
app.use('/', postMultipleProduct)
app.use('/', deleteProduct)
app.use('/', updateAProduct)
// users
app.use('/', getAnUser)
app.use('/', updateUserInfo)
//payments
app.use('/', payment)
app.use('/', addPaymentInfo)

// ---------- Moderator routes -----------
app.use('/', verifyModerator)
// products
app.use('/', switchFeaturedProduct)
app.use('/', updateProductStatus)
app.use('/', getAllProduct)

// ---------- Admin routes -----------
app.use('/', verifyAdmin)
// products
app.use('/', deleteReview)
// users
app.use('/', getAllUser)
app.use('/', promoteToModerator)
app.use('/', promoteToAdmin)
app.use('/', demoteToUser)
// payments
app.use('/', getAllPayments)
app.use('/', updatePaymentStatus)

// TODO: hit those api
app.listen(port, () => {
  console.log('This server is running in the port no:', port)
})
