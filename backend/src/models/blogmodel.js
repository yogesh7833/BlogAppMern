const mongoose=require('mongoose');

//modify this after user created 
const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,

    },
    content:String,
    coverImg:String,
    category:String,
    author:String,
    rating:Number,
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const Blog=mongoose.model('Blog',BlogSchema);
module.exports=Blog;