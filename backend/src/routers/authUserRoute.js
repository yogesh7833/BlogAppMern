const express=require('express');
const User = require('../models/userModel');
const generateToken = require('../middleware/generateToken');

const router=express.Router();

//register a new user

router.post('/register', async(req,res)=>{
    try {
        const {email, password, username}=req.body;
        const user=new User({email, password, username});
        console.log(user);

        await user.save();
        res.status(200).send({
            message:"user register successfully",
            user:user,
        })

    } catch (error) {
        console.error("Failed to register",error);
        res.status(500).json({
            message:"Registration failed"
        })
    }
})

//login a user 
router.post('/login', async(req,res)=>{
    try {
        console.log(req.body);
        const {email, password}=req.body;

        const user=await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).send({
                message:"User is not found",
            })
        }
        const isMatch=await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).send({
                message:"Invalid password",
            })
        }
        //todo genrate token
        const token=await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly:true, //enable this only when you have https://
            secure:true,
            sameSite:true,
        })
        res.status(200).send({
            message:"login successfull", token,
            user:{
                id:user._id,
              email:user.email,
            username:user.username,
            role:user.role       
         }
        })
    } catch (error) {
        console.error("Failed to login",error);
        res.status(500).json({
            message:"login failed"
        })
    }
})

//logout user
router.post('/logout', async (req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).send({
            message:"logout Successfully"
        })
    } catch (error) {
        console.error("Failed to logout",error);
        res.status(500).json({
            message:"logout failed"
        })   
    }
})

//get all users
router.get('/users', async(req,res)=>{
    try {
        const users=await User.find({}, 'id email role');
        res.status(200).send({
            message:"Users found successfully",users
        })
    } catch (error) {
        console.log("Error fecting users", error);
        res.status(500).json({
            message:"failed to fetch user"
        })
    }
})

//delete a user
router.delete('/users/:id', async (req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({
                message:"user not found",
            })
        }
        res.status(200).send({
            message:"User deleted successfully"
        })
    } catch (error) {
        console.log("Error deleting users", error);
        res.status(500).json({
            message:"Error deleting users"
        })
    }
})

//update auser role
router.put('/users/:id', async (req,res)=>{
    try {
        const {id}=req.params
        const {role}=req.body;
        const user=await User.findByIdAndUpdate(id, {role},{new:true});
        if(!user){
            return res.status(404).send({
                message:"user not found",
            })
        }
        res.status(200).send({
            message:"User role updated successsfully",user
        })
    } catch (error) {
        console.log("Error updating  user role", error);
        res.status(500).json({
            message:"Error updating  user role"
        })
    }
})

module.exports=router;