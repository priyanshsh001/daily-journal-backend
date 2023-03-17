const jwt = require('jsonwebtoken')

const con2=require('../Userconfig')
const User=con2.model('user',require('../Usermodel'))


const requireAuth = async (req, res, next) =>{
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
// it will take the token 
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.Secret)
    
    req.user = await User.findOne({ _id }).select('_id')
    next() // now it will direct to the next function after authorisation

  } catch (error) {
    
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth