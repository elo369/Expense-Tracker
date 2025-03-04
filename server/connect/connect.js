import mongoose from "mongoose"

const connectDB = async()=>{
    try {
    const connect = await mongoose.connect(`${process.env.MONGODB_SERVER}`)

    console.log("connectDB :",
        connect.connection.host,
        connect.connection.name
    )
    
    } catch (error) {
        console.log("mongodb server",error)
        process.exit(1)
    }
    
}

export default connectDB