const express = require('express');
const connectDB = require('../../db/mongo_client');
const router = express.Router()

router.patch('/users/:email/has-paid-subscription', async (req, res)=>{
  console.log("patch /users/:email/has-paid-subscription api is being hit")
  try{
    const {id} = req.body;
    const {userCollection} = await connectDB()

  }catch(err){
    return res.send(500).send({message: "Server Error"})
  }finally{
    console.log('/patch /users/:email/has-paid-subscription request finished.')
  }
})