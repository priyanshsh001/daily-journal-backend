require('dotenv').config();
const mongoose =require("mongoose");
const con1=mongoose.createConnection(process.env.NoteDatabase );
module.exports=con1;