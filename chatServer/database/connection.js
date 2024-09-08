import mongoose from "mongoose";

const Connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL) 
        console.log('Connected with MONGODB')
    } catch(err) {
        console.log(err)
    }
}

export default Connect