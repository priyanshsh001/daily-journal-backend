const express =require('express')
const requireAuth =require('../db/middleware/requireAuth')
const app=express();

const con1 = require('../db/config');
const Post = con1.model('post', require('../db/model'));

//used for authentication

app.use(requireAuth);

app.post('/compose',async(req,res)=>{
    const { title, content } = req.body
    // user_id will be same for the same users
    const user_id = req.user._id
    let newpost = new Post({ title, content, user_id });
    let result = newpost.save().then((curr) => {
      res.send(curr)
      console.log(curr)
    })
      .catch(err => res.status(400).json("Error: " + err));
 
 
}) 

app.get('/compose', (req,res)=>{
    const user_id = req.user._id;
  
    Post.find({ user_id })
      .then(posts => res.send(posts))
      .catch(err => { res.status(400).json("Error: " + err) });
})

app.delete("/:postId", (req,res)=>{
  
      Post.findByIdAndDelete(req.params.postId)
      .then(() => res.send("successfully deleted"))
      .catch(err => res.status(400).json("Error: " + err));
})
app.get("/:postId", (req,res)=>{
  Post.findById(req.params.postId)
  .then(post =>  res.send(post ))
  .catch(err => res.status(400).json("Error: " + err));
})
module.exports = app