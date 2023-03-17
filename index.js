const express =require('express') //import express
//used for cors error for network across different ports in the network
const cors=require('cors')
// it is used as password hashing function
const bcrypt=require('bcrypt')

require('dotenv').config();

//import user route
const user=require('./routes/userroutes')

//import note route
const note=require('./routes/notesroute')



const port=process.env.PORT || 3000;

const app=express();
app.use(express.json());
app.use(cors());
app.use(user);
app.use(note);





app.listen(port,(req,res)=>{
    console.log(`server started at port ${port}`)
})