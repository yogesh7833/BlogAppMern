const mongoose=require('mongoose');


require('dotenv').config();

exports.connect = ()=>{
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Db connected successfully")).catch((err)=>{
    console.log('db connection issue');
    console.log(err);
    process.exit(1);
})
}