const express=require('express');

const router=express.Router();
const Comment=require('../models/commentModel')

//create a comment 
router.post('/post-comment', async (req,res)=>{
    try {
        console.log(req.body);
    const newComment=new Comment(req.body);
    await newComment.save();
    res.status(200).send({
        message:"Comment created Successfully",
        comment:newComment,
    })
    } catch (error) {
        console.error("An error occured while posting comment", error);
        res.status(500).send({
            message:"An error while posting new comment",
        })
    }
})

//get all comments

router.get('/total-comment', async(req,res)=>{
    try {
        const totalComment=await Comment.countDocuments({});
        res.status(200).send({
            message:"Total comments count", totalComment
        })
        
    } catch (error) {
        console.error("An error occured while getting comment count", error);
        res.status(500).send({
            message:"An error while grtting comment count",
        })
    }
})


module.exports=router;