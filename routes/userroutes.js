const express = require('express')
const app = express();

//importing user schema to store user detail
const con2 = require('../db/Userconfig')
const User = con2.model('user', require('../db/Usermodel'))

const jwt = require('jsonwebtoken') //to convert password to jwt token
require('dotenv').config();

//creating the jwt token it requires the paylod and secret key and it is valid for 3 days
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.Secret, { expiresIn: '3d' })
}
 
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })// token are basically shared across the network
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.post('/signup', async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password)

    const token = createToken(user._id) //creating token using id 

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
module.exports = app