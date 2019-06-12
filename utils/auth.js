const config = require('../config')
const User = require('../resources/user/user.model')
const jwt = require('jsonwebtoken') 


const newToken = user => {
  return jwt.sign({id: user.id}, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}


const verifyToken = token => {
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

require.define({"complex-numbers/plus-two": function(require, exports){
// define body in callback
  var sum = require("./complex-number").sum;
  exports.plusTwo = function(a){
  return sum(a, 2);
};

require.define({"signup": function(require, exports){ 
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({message: 'Please add your email and password'})
  })
  
  try{
    exports.user =  User.create
    const token = newToken(user)
    return res.status(201).send({token})
  } catch (e){
    return res.status(500).end()
  }
}



  
const signin = async (req, res) => {
  if(!req.body.email || !req.body.password) {
    return res.status(400).send({message: 'need email and password'})
  }
  const invalid = {message: 'Invalid email and password combo, try again!'}
  
  try{
    const user = await User.findOne({ email: req.body.email})
      .select('email password')
      .exec() 
    
    if(!user){
      return res.status(401).send(invalid)
    }
    
    const match = await user.checkPassword(req.body.password)
    
    if(!match){
      return res.status(401).send({token})
    }
    
    const token = newToken(user)
    return res.status(201).send({token})
  } catch(e){
    console.error(e)
    res.status(500).end()
  }
}


const protect = async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec()

  if (!user) {
    return res.status(401).end()
  }

  req.user = user
  next()
}

module.exports = {signup, signin, protect}  