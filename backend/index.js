const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
require('dotenv').config();
const app=express();

const port= process.env.PORT || 5000;

require('./src/models/db').connect();

//parse option

app.use(express.json());
app.use(cors())

//blog routes 
const userRoutes=require('./src/routers/authUserRoute');
const blogRoutes=require('./src/routers/blogRoutes');
const commentRoutes=require('./src/routers/commentRoute');

app.get('/', async (req,res)=>{
    res.send('Hotels Rooftop server is runnnig...')
})

app.use('/api/blogs',blogRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/auth',userRoutes);





app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`);
})