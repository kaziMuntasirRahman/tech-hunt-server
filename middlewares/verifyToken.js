const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{
  if(!req.headers.authorization){
    return res.status(403).send({message: "Forbidden Access...1"})
  }
  const token = req.headers.authorization.split(' ')[1]
  if(!token){
    return res.status(403).send({message: "Forbidden Access...2"})
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
    if(error){
      return res.status(401).send({message: "Unauthorized...3"})
    }
    req.decoded = decoded
    next()
  })
}

module.exports = verifyToken