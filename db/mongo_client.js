const { MongoClient, ServerApiVersion } = require('mongodb')

require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermuntasir.bwzlexy.mongodb.net/?retryWrites=true&w=majority&appName=clusterMuntasir`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const connectDB = async () => {
  try {
    console.log('connectDB function is called...')
    // await client.connect()
    const db = client.db('TechHuntDB')
    // await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. Successfully connected to MongoDB!')
    return {
      userCollection: db.collection('users'),
      productCollection: db.collection('products'),
      paymentCollection: db.collection('payments')
    }
  } catch (err) {
    console.log('Failed to connect to MongoDB: ', err)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}

module.exports = connectDB
