// it is used for creating the connection of userdatabase which will store the email and password of the users
require('dotenv').config();
const mongoose =require("mongoose");
const con2=mongoose.createConnection(process.env.UserDatabase );
module.exports=con2;