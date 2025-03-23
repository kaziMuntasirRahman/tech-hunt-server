const connectDB = require('../db/mongo_client')

const verifyModerator = async (req, res, next) => {
  const { email } = req.decoded
  try {
    const { userCollection } = await connectDB()
    const user = await userCollection.findOne({ email: email })
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized...6' })
    }
    const isAdmin = (user.status === 'moderator' || user.status === 'admin')
    if (!isAdmin) {
      return res.status(403).send({ message: 'Forbidden...7' })
    }
    next()
  } catch (err) {
    return res.status(500).send({ message: 'Server Error' })
  } finally {
    console.log('....verifyModerator....')
  }
}

module.exports = verifyModerator
