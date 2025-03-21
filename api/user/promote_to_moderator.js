const express = require('express');
const router = express.Router()
const connectDB = require('../../db/mongo_client');
const { ObjectId } = require('mongodb');

router.patch('/users/:id/moderator', async (req, res)=>{
  console.log("patch /users/:id/moderator api is being hit...")
  try{
    const {id} = req.params
    const {userCollection} = await connectDB()
    const result = await userCollection.updateOne({_id: new ObjectId(id)}, {$set: {status: 'moderator'}}, {upsert: true})
    return res.status(200).send(result)
  }catch(err){
    return res.status(200).send({message: "Server Error"})
  }finally{
    console.log("patch /users/:id/moderator request finished.")
  }
})

module.exports = router