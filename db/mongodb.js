import mongoose from "mongoose";

// connection file
const mongoconn = async() =>{
try{
   await mongoose.connect(process.env.MONGODB_URZ)
    // console.log("Connected to db...")
}catch(error){
    console.log(error)
}
};

export default mongoconn;