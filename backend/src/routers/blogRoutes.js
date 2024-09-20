const express=require('express');
const Blog = require('../models/blogmodel');
const Comment = require('../models/commentModel');
const { verifyToken } = require('../middleware/verifyToken');
const router=express.Router();

//create a post 
router.post('/create-post',verifyToken, async (req,res)=>{
    try {
        // console.log("blog data from api",req.body);
        const newPost= new Blog({...req.body}); //use author :req.userId, when you have token verification 
        await  newPost.save();
        res.status(200).send({
            message:"post created successfully",
            post:newPost,
        })

    } catch (error) {
        console.log("Errror creating post",error);
        res.status(500).send({message:'Error creating post'})
    }
})
router.get('/',async (req,res)=>{
    try {
        const {search, category, location}=req.query;
        console.log(search);
        let query={};
        if(search){
            query={...query, $or:[
                {title:{$regex:search, $options:"i"}},
                {content:{$regex:search,$options:"i"}},
            ]}
        }

        if(category){
            query={
                ...query, category,
            }
        }
        if(location){
            query={
                ...query,
                location,
            }
        }
        const post =await Blog.find(query).populate('author', 'email').pop({createdAt: -1});
        res.status(200).send({
            message:'find succcessfully',
            posts:post,
        })

    } catch (error) {
        console.log("Errror creating post",error);
        res.status(500).send({message:'Error creating post'})
    }

})

//get single blog by id
router.get("/:id", async (req, res)=>{
    try {
        const postId=req.params.id;
        const post=await Blog.findById(postId);
        if(!post){
            return res.status(404).send({
                message:"Post not found"
            })
        }

        const comment=await Comment.find({postId:postId}).populate('user', "username email")
         res.status(200).send({
            message:"POst received successfully",
            post:post,
         })
    } catch (error) {
        console.log("Errror fetching single post",error);
        res.status(500).send({message:'Error fetching single post '})
    }
})

//update a blog post 

router.patch("/update-post/:id",verifyToken, async(req,res)=>{
    try {
        const postId=req.params.id;
        const updatePost=await Blog.findByIdAndUpdate(postId, {
            ...req.body
        },{new:true});

        if(!updatePost){
            return res.status(404).send({
                message:"Post not found"
            })
        }
        res.status(200).send({
            message:"Post updated successfully",
            post:updatePost
        })
    } catch (error) {
            console.log("Errror fetching single post",error);
            res.status(500).send({message:'Error fetching single post '})
    }
})

//delete a blog post 
router.delete("/:id",verifyToken, async(req,res)=>{
    try {
        const postId=req.params.id;
        const post=await Blog.findByIdAndDelete(postId);
        if(!post){
            return res.status(404).send({
                message:"post is not found"
            })
        }

        await Comment.deleteMany({postId:postId})
        res.status(200).send({
            message:"post deleted successfully",
            post:post,
        })
    } catch (error) {
        console.log("Error In deleting a post",error);
        res.status(500).send({message:'Erro in deleting the post '})
    }
})

//related posts

router.get("/related/:id", async(req,res)=>{
    try {
        const id=req.params.id;
        if(!id){
            return res.status(400).send({
                message:"Post is not required"
            })
        }
        const blog=await Blog.findById(id);

        if(!blog){
            return res.status(404).send({
                message:"Post is not found"
            })
        }

        const titleRegex=new RegExp(blog.title.split(' ').join('|'), 'i');

        const relatedQuery={
            _id:{$ne: id}, //exclude the current blog by id
            title:{$regex: titleRegex}
        }

        const relatedPost=await Blog.find(relatedQuery)

        res.status(200).send({
            message:"Related Post found",
            post:relatedPost,
        })
        
    } catch (error) {
        console.log("Error fetching related post",error);
        res.status(500).send({message:'Error fetching related posts'})
    }
})

module.exports=router;