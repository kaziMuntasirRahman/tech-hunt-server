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
// jwt
const jwt = require('./api/jwt/jwt')
//middlewares
const verifyToken = require('./middlewares/verifyToken')
const verifyAdmin = require('./middlewares/verifyAdmin')
// products
const getOneProduct = require('./api/products/get_a_product')
const getAllProduct = require('./api/products/get_all_products')
const getAllApprovedProduct = require('./api/products/get_all_approved_product')
const postMultipleProduct = require('./api/products/post_product')
const handleUpvote = require('./api/products/handle_upvote')
const postReview = require('./api/products/post_new_review')
const deleteReview = require('./api/products/delete_a_review')
const getUsersProducts = require('./api/products/get_an_users_products')
const switchFeaturedProduct = require('./api/products/switch_featured_product')
const updateProductStatus = require('./api/products/update_status')
// users
const postNewUser = require('./api/user/post_new_user')
const getAllUser = require('./api/user/get_all_user')
const getAnUser = require('./api/user/get_an_user')
const postSubscriber = require('./api/user/post_subscriber')
const updateUserInfo = require('./api/user/update_profile_info')
const promoteToModerator = require('./api/user/promote_to_moderator')
const promoteToAdmin = require('./api/user/promote_to_admin')
const demoteToUser = require('./api/user/demote_to_user')


// call the APIs
//jwt
app.use('/', jwt)

// ---------- public routes -----------
//products
app.use('/', getAllApprovedProduct)
// users
app.use('/', postNewUser)
app.use('/', postSubscriber)


// ---------- Protected routes -----------
app.use('/', verifyToken)
// products
app.use('/', getOneProduct)
app.use('/', handleUpvote)
app.use('/', postReview)
app.use('/', getUsersProducts)
app.use('/', postMultipleProduct)
// users
app.use('/', getAnUser)
app.use('/', updateUserInfo)


// ---------- Moderator routes -----------
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

// TODO: hit those api
app.listen(port, () => {
  console.log('This server is running in the port no:', port)
})
